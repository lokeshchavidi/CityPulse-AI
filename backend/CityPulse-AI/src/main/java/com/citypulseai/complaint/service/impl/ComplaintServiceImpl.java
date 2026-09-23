package com.citypulseai.complaint.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.citypulseai.ai.entity.AIAnalysis;
import com.citypulseai.ai.enums.AIAnalysisStatus;
import com.citypulseai.ai.repository.AIAnalysisRepository;
import com.citypulseai.ai.service.AIService;
import com.citypulseai.ai.util.AnalysisIdGenerator;
import com.citypulseai.cloudinary.service.CloudinaryService;
import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.complaint.dto.AssignDepartmentRequest;
import com.citypulseai.complaint.dto.AssignOfficerRequest;
import com.citypulseai.complaint.dto.ComplaintResponse;
import com.citypulseai.complaint.dto.CreateComplaintRequest;
import com.citypulseai.complaint.dto.UpdateComplaintPriorityRequest;
import com.citypulseai.complaint.dto.UpdateComplaintStatusRequest;
import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.complaint.entity.ComplaintStatus;
import com.citypulseai.complaint.enums.ComplaintHistoryAction;
import com.citypulseai.complaint.enums.ComplaintPriority;
import com.citypulseai.complaint.exception.ComplaintNotFoundException;
import com.citypulseai.complaint.exception.DepartmentNotAssignedException;
import com.citypulseai.complaint.exception.InvalidOfficerException;
import com.citypulseai.complaint.mapper.ComplaintMapper;
import com.citypulseai.complaint.repository.ComplaintRepository;
import com.citypulseai.complaint.service.ComplaintHistoryService;
import com.citypulseai.complaint.service.ComplaintService;
import com.citypulseai.complaint.utils.ComplaintIdGenerator;
import com.citypulseai.department.entity.Department;
import com.citypulseai.department.exception.DepartmentNotFoundException;
import com.citypulseai.department.repository.DepartmentRepository;
import com.citypulseai.notification.dto.NotificationMessages;
import com.citypulseai.notification.entity.NotificationType;
import com.citypulseai.notification.service.NotificationService;
import com.citypulseai.role.enums.RoleType;
import com.citypulseai.security.CustomUserDetails;
import com.citypulseai.user.entity.User;
import com.citypulseai.user.exception.UserNotFoundException;
import com.citypulseai.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComplaintServiceImpl implements ComplaintService{

	private final ComplaintRepository complaintRepository;
	private final ComplaintMapper complaintMapper;
	private final ComplaintIdGenerator complaintIdGenerator;
	private final UserRepository userRepository;
	private final CloudinaryService cloudinaryService;
	private final DepartmentRepository departmentRepository;
	private final AIService aiService;
	private final AIAnalysisRepository aiAnalysisRepository;
	private final AnalysisIdGenerator analysisIdGenerator;
	private final ComplaintHistoryService complaintHistoryService;
	private final NotificationService notificationService;
	private final com.citypulseai.complaint.service.ComplaintAccessValidator complaintAccessValidator;
	
	@Override
	@Transactional
	public ComplaintResponse createComplaint(CreateComplaintRequest complaintRequest,
			MultipartFile image) {
		
		//upload the complaint image to the Cloudinary and obtain its secure URL.
		String imageUrl = cloudinaryService.uploadImage(image);
		
		User citizen = getCurrentUser();

	    Complaint complaint = complaintMapper.toEntity(complaintRequest);
	    complaint.setImageUrl(imageUrl);
	    complaint.setComplaintId(complaintIdGenerator.generateComplaintId());
	    complaint.setCitizen(citizen);
	    complaint.setStatus(ComplaintStatus.OPEN);
	    complaint.setPriority(ComplaintPriority.MEDIUM);
	    Complaint savedComplaint = complaintRepository.save(complaint);
	    
	    complaintHistoryService.recordHistory(
	            savedComplaint,
	            ComplaintHistoryAction.CREATED,
	            citizen,
	            null,
	            "Complaint Created",
	            "Complaint created successfully.");
	    
	    notificationService.createNotification(
	            citizen,
	            savedComplaint,
	            NotificationType.COMPLAINT_CREATED,
	            NotificationMessages.COMPLAINT_SUBMITTED_TITLE,
	            "Your complaint " + savedComplaint.getComplaintId()
	                    + " has been submitted successfully."
	    );
	    
	    // aiService.analyzeComplaint() is @Async — it runs on a separate
	    // thread/connection and looks the complaint back up by ID. Since
	    // this whole method is @Transactional, the INSERT above isn't
	    // actually committed yet at this point in the code — it only
	    // commits when this method returns. Calling the async trigger
	    // directly here would race that commit: the async thread's lookup
	    // could run before the row is visible and fail with
	    // ComplaintNotFoundException, which AIServiceImpl treats as an
	    // analysis failure (citizen gets "taking longer than usual",
	    // admins get alerted) on effectively every complaint. Registering
	    // it as an afterCommit synchronization guarantees it only fires
	    // once the complaint row is durably committed and visible.
	    String complaintIdForAnalysis = savedComplaint.getComplaintId();

	    org.springframework.transaction.support.TransactionSynchronizationManager
	            .registerSynchronization(
	                    new org.springframework.transaction.support.TransactionSynchronization() {
	                        @Override
	                        public void afterCommit() {
	                            aiService.analyzeComplaint(complaintIdForAnalysis);
	                        }
	                    });

	    return complaintMapper.toResponse(savedComplaint);
	}

	@Override
	@Transactional(readOnly = true)
	public ComplaintResponse getComplaintById(String complaintId) {
		
		Complaint complaint = complaintRepository.findByComplaintId(complaintId)
			.orElseThrow(() -> new ComplaintNotFoundException(AppConstants.COMPLAINT_NOT_FOUND));
		
		User currentUser = getCurrentUser();

		// Complaint IDs (CMP-00001, CMP-00002, ...) are sequential and easy
		// to guess. Previously only CITIZEN callers were checked for
		// ownership — an Officer or Department Manager could look up any
		// complaint by ID regardless of whether it was assigned to them or
		// in their department. Now enforced for every role.
		complaintAccessValidator.validateAccess(complaint, currentUser);

		ComplaintResponse response = complaintMapper.toResponse(complaint);
		response.setNeedsManualAssignment(needsManualAssignment(complaintId));

		return response;
	}

	@Override
	@Transactional(readOnly = true)
	public List<ComplaintResponse> getMyComplaints() {
		
		User currentUser = getCurrentUser();
		List<Complaint> complaints = complaintRepository.findByCitizen(currentUser);
				
		return complaints.stream()
			.map(complaintMapper::toResponse)
			.toList();
	}

	@Override
	@Transactional(readOnly = true)
	public List<ComplaintResponse> getAllComplaints() {
		
		List<Complaint> allComplaints = complaintRepository.findAllWithAssociations();
		Set<String> needsManualAssignment = new HashSet<>(
				aiAnalysisRepository.findComplaintIdsNeedingManualAssignment());

		return allComplaints.stream()
				.map(complaint -> {
					ComplaintResponse response = complaintMapper.toResponse(complaint);
					response.setNeedsManualAssignment(
							needsManualAssignment.contains(complaint.getComplaintId()));
					return response;
				})
				.collect(Collectors.toList());
	}

	/**
	 * Admin-only manual override of a complaint's status. The normal
	 * workflow (Officer starting/resolving work, Department Manager
	 * accepting/overriding AI recommendations) records history and notifies
	 * the citizen through the dedicated Officer/DepartmentManager services;
	 * this generic override previously did neither, silently changing state
	 * with no audit trail and no citizen notification. Both are now added.
	 */
	@Override
	@Transactional
	public ComplaintResponse updateComplaintStatus(String complaintId, UpdateComplaintStatusRequest request) {
		
		Complaint existingComplaint = complaintRepository.findByComplaintId(complaintId)
			.orElseThrow(() -> new ComplaintNotFoundException(AppConstants.COMPLAINT_NOT_FOUND));
		
		ComplaintStatus oldStatus = existingComplaint.getStatus();

		existingComplaint.setStatus(request.getStatus());
		
		Complaint updatedComplaint = complaintRepository.save(existingComplaint);

		User admin = getCurrentUser();

		complaintHistoryService.recordHistory(
				updatedComplaint,
				ComplaintHistoryAction.STATUS_CHANGED,
				admin,
				oldStatus != null ? oldStatus.name() : null,
				request.getStatus().name(),
				"Status manually updated by an administrator.");

		notificationService.createNotification(
				updatedComplaint.getCitizen(),
				updatedComplaint,
				NotificationType.GENERAL,
				"Complaint Status Updated",
				"Your complaint " + updatedComplaint.getComplaintId()
						+ " status was updated to " + request.getStatus().name() + ".");
		
		return complaintMapper.toResponse(updatedComplaint);
	}

	@Override
	@Transactional
	public ComplaintResponse assignDepartment(String complaintId, AssignDepartmentRequest departmentRequest) {
		
		Complaint existingComplaint = complaintRepository.findByComplaintId(complaintId)
			.orElseThrow(() -> new ComplaintNotFoundException(AppConstants.COMPLAINT_NOT_FOUND));
		
		Department existingDepartment = departmentRepository.findById(departmentRequest.getDepartmentId())
			.orElseThrow(() -> new DepartmentNotFoundException(AppConstants.DEPARTMENT_NOT_FOUND));

		Department oldDepartment = existingComplaint.getDepartment();
		ComplaintStatus previousStatus = existingComplaint.getStatus();

		existingComplaint.setDepartment(existingDepartment);

		// A failed (or missing) analysis leaves the complaint OPEN, so it
		// never enters a manager queue. Moving only those to UNDER_REVIEW
		// puts them on this department's queue for officer assignment.
		// A completed analysis stays OPEN so the manager can still accept
		// or override the recommendation.
		boolean routeFailedAnalysis = previousStatus == ComplaintStatus.OPEN
				&& !hasCompletedAnalysis(complaintId);

		if (routeFailedAnalysis) {
			ensureFailedAnalysisRecord(existingComplaint);
			existingComplaint.setStatus(ComplaintStatus.UNDER_REVIEW);
		}

		Complaint savedComplaint = complaintRepository.save(existingComplaint);

		User admin = getCurrentUser();

		complaintHistoryService.recordHistory(
				savedComplaint,
				ComplaintHistoryAction.DEPARTMENT_CHANGED,
				admin,
				oldDepartment != null ? oldDepartment.getDepartmentName() : null,
				existingDepartment.getDepartmentName(),
				"Department manually reassigned by an administrator.");

		if (routeFailedAnalysis) {
			complaintHistoryService.recordHistory(
					savedComplaint,
					ComplaintHistoryAction.STATUS_CHANGED,
					admin,
					previousStatus.name(),
					ComplaintStatus.UNDER_REVIEW.name(),
					"Status moved to under review after an administrator assigned the department.");
		}

		if (routeFailedAnalysis) {
			List<User> managers = userRepository.findByRole_RoleTypeAndDepartment(
					RoleType.DEPARTMENT_MANAGER,
					existingDepartment);

			for (User manager : managers) {
				notificationService.createNotification(
						manager,
						savedComplaint,
						NotificationType.GENERAL,
						"Complaint assigned to your department",
						"Complaint " + savedComplaint.getComplaintId()
								+ " was assigned to your department and is ready for an officer.");
			}
		}

		return complaintMapper.toResponse(savedComplaint);
	}

	/**
	 * Admin-only manual officer (re)assignment. Previously this never moved
	 * the complaint into ASSIGNED status and never checked the officer
	 * belongs to the complaint's department — meaning the complaint would
	 * silently never show up in the officer's "Assigned Complaints" queue
	 * (which filters by status), and an officer from an unrelated
	 * department could be assigned. Both are fixed below, mirroring the
	 * validation already done correctly in DepartmentManagerServiceImpl.
	 */
	@Override
	@Transactional
	public ComplaintResponse assignOfficer(String complaintId, AssignOfficerRequest
			officerRequest) {
		
		Complaint existingComplaint = complaintRepository.findByComplaintId(complaintId)
			.orElseThrow(() -> new ComplaintNotFoundException(AppConstants.COMPLAINT_NOT_FOUND));
		
		User existingOfficer = userRepository.findByUserId(officerRequest.getOfficerId())
			.orElseThrow(() -> new UserNotFoundException(AppConstants.USER_NOT_FOUND));
		
		if(existingComplaint.getDepartment() == null) {
			throw new DepartmentNotAssignedException(AppConstants.DEPARTMENT_NOT_ASSIGNED);
		}
		
		if (existingOfficer.getRole().getRoleType() != RoleType.OFFICER) {
	        throw new InvalidOfficerException(AppConstants.INVALID_OFFICER);
	    }

		if (existingOfficer.getDepartment() == null
				|| !existingOfficer.getDepartment().getDepartmentId()
						.equals(existingComplaint.getDepartment().getDepartmentId())) {

			throw new InvalidOfficerException(
					"Officer does not belong to the department this complaint is assigned to.");
		}
		
		existingComplaint.setAssignedOfficer(existingOfficer);
		existingComplaint.setStatus(ComplaintStatus.ASSIGNED);
		
		Complaint updatedComplaint = complaintRepository.save(existingComplaint);

		User admin = getCurrentUser();

		complaintHistoryService.recordHistory(
				updatedComplaint,
				ComplaintHistoryAction.OFFICER_ASSIGNED,
				admin,
				null,
				existingOfficer.getUserId(),
				"Officer manually assigned by an administrator.");

		notificationService.createNotification(
				existingOfficer,
				updatedComplaint,
				NotificationType.OFFICER_ASSIGNED,
				NotificationMessages.OFFICER_ASSIGNED_TITLE,
				"Complaint " + updatedComplaint.getComplaintId() + " has been assigned to you.");
		
		return complaintMapper.toResponse(updatedComplaint);
	}
	
	@Override
	@Transactional
	public ComplaintResponse updateComplaintPriority(String complaintId,
			UpdateComplaintPriorityRequest priorityRequest) {
		
		Complaint existingComplaint = complaintRepository.findByComplaintId(complaintId)
				.orElseThrow(() -> new ComplaintNotFoundException(AppConstants.COMPLAINT_NOT_FOUND));
		
		ComplaintPriority oldPriority = existingComplaint.getPriority();

		existingComplaint.setPriority(priorityRequest.getPriority());
		
		Complaint updatedComplaint = complaintRepository.save(existingComplaint);

		User admin = getCurrentUser();

		complaintHistoryService.recordHistory(
				updatedComplaint,
				ComplaintHistoryAction.PRIORITY_CHANGED,
				admin,
				oldPriority != null ? oldPriority.name() : null,
				priorityRequest.getPriority().name(),
				"Priority manually updated by an administrator.");
		
		return complaintMapper.toResponse(updatedComplaint);
	}

	private boolean needsManualAssignment(String complaintId) {
		return aiAnalysisRepository
				.existsByComplaint_ComplaintIdAndStatusAndComplaint_DepartmentIsNull(
						complaintId,
						AIAnalysisStatus.FAILED);
	}

	private boolean hasCompletedAnalysis(String complaintId) {
		return aiAnalysisRepository.findByComplaint_ComplaintId(complaintId)
				.map(analysis -> analysis.getStatus() == AIAnalysisStatus.COMPLETED)
				.orElse(false);
	}

	private void ensureFailedAnalysisRecord(Complaint complaint) {
		if (aiAnalysisRepository.existsByComplaint_ComplaintId(complaint.getComplaintId())) {
			return;
		}

		aiAnalysisRepository.save(AIAnalysis.builder()
				.analysisId(analysisIdGenerator.generateAnalysisId())
				.complaint(complaint)
				.status(AIAnalysisStatus.FAILED)
				.remarks("Assigned manually after automatic analysis did not complete.")
				.build());
	}

	private User getCurrentUser() {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		
		User user = userRepository.findByEmail(userDetails.getUsername()).
			orElseThrow(() -> new UserNotFoundException(AppConstants.AUTHENTICATED_USER_NOT_FOUND));
		
		return user;
	}

}
