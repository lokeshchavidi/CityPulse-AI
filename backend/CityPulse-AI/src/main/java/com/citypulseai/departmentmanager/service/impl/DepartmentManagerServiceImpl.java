package com.citypulseai.departmentmanager.service.impl;

import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citypulseai.ai.entity.AIAnalysis;
import com.citypulseai.ai.exception.AIAnalysisException;
import com.citypulseai.ai.repository.AIAnalysisRepository;
import com.citypulseai.common.service.CurrentUserService;
import com.citypulseai.complaint.dto.ComplaintResponse;
import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.complaint.entity.ComplaintStatus;
import com.citypulseai.complaint.enums.ComplaintHistoryAction;
import com.citypulseai.complaint.enums.ComplaintPriority;
import com.citypulseai.complaint.mapper.ComplaintMapper;
import com.citypulseai.complaint.repository.ComplaintRepository;
import com.citypulseai.complaint.service.ComplaintHistoryService;
import com.citypulseai.department.entity.Department;
import com.citypulseai.department.exception.DepartmentNotFoundException;
import com.citypulseai.department.repository.DepartmentRepository;
import com.citypulseai.departmentmanager.dto.AssignOfficerRequest;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintDetailsResponse;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintResponse;
import com.citypulseai.departmentmanager.dto.DepartmentDashboardResponse;
import com.citypulseai.departmentmanager.dto.OfficerResponse;
import com.citypulseai.departmentmanager.dto.OverrideAIRecommendationRequest;
import com.citypulseai.departmentmanager.exception.InvalidComplaintStateException;
import com.citypulseai.departmentmanager.mapper.DepartmentManagerMapper;
import com.citypulseai.departmentmanager.service.DepartmentManagerService;
import com.citypulseai.notification.dto.NotificationMessages;
import com.citypulseai.notification.entity.NotificationType;
import com.citypulseai.notification.service.NotificationService;
import com.citypulseai.role.enums.RoleType;
import com.citypulseai.user.entity.User;
import com.citypulseai.user.exception.UserNotFoundException;
import com.citypulseai.user.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentManagerServiceImpl implements DepartmentManagerService{

	private final AIAnalysisRepository aiAnalysisRepository;
	
	private final DepartmentManagerMapper departmentManagerMapper;
	
	private final CurrentUserService currentUserService;
	
	private final ComplaintMapper complaintMapper;
	
	private final ComplaintRepository complaintRepository;
	
	private final UserRepository userRepository;
	
	private final ComplaintHistoryService complaintHistoryService;
	
	private final NotificationService notificationService;
	
	private final DepartmentRepository departmentRepository;
	
	@Override
	@Transactional(readOnly = true)
	public List<DepartmentComplaintResponse> getComplaintQueue() {

	    User manager = currentUserService.getCurrentUser();

	    Department department = manager.getDepartment();

	    if (department == null) {
	        throw new DepartmentNotFoundException(
	                "Department Manager is not assigned to any department.");
	    }

	    List<AIAnalysis> analyses =
	            aiAnalysisRepository.findComplaintQueueByDepartment(
	                    department);

	    return analyses.stream()
	            .map(departmentManagerMapper::toComplaintResponse)
	            .toList();
	}

	@Override
	@Transactional(readOnly = true)
	public DepartmentComplaintDetailsResponse getComplaintDetails(String complaintId) {

	    User manager = currentUserService.getCurrentUser();

	    AIAnalysis aiAnalysis = aiAnalysisRepository
	            .findByComplaint_ComplaintId(complaintId)
	            .orElseThrow(() -> new AIAnalysisException("AI analysis not found for complaint: " + complaintId));

	    validateDepartmentAccess(manager, aiAnalysis);

	    return departmentManagerMapper.toComplaintDetailsResponse(aiAnalysis);
	}
	
	private void validateDepartmentAccess(User manager, AIAnalysis aiAnalysis) {

	    Department managerDepartment = manager.getDepartment();

	    if (managerDepartment == null) {
	        throw new DepartmentNotFoundException("Department Manager is not assigned to any department.");
	    }

	    Complaint complaint = aiAnalysis.getComplaint();

	    Department department = complaint.getDepartment() != null
	            ? complaint.getDepartment()
	            : aiAnalysis.getSuggestedDepartment();

	    if (department == null) {
	        throw new AIAnalysisException("AI did not suggest a department for this complaint.");
	    }

	    if (!managerDepartment.getDepartmentId()
	            .equals(department.getDepartmentId())) {

	        throw new AccessDeniedException(
	                "You are not authorized to access complaints assigned to another department.");
	    }
	}

	@Override
	@Transactional
	public ComplaintResponse acceptAIRecommendation(String complaintId) {

	    User manager = currentUserService.getCurrentUser();

	    AIAnalysis aiAnalysis = aiAnalysisRepository
	            .findByComplaint_ComplaintId(complaintId)
	            .orElseThrow(() -> new AIAnalysisException(
	                    "AI analysis not found for complaint: " + complaintId));

	    validateDepartmentAccess(manager, aiAnalysis);

	    Complaint complaint = aiAnalysis.getComplaint();

	    validateComplaintForAIAcceptance(complaint, aiAnalysis);

	    applyAIRecommendation(complaint, aiAnalysis);

	    Complaint updatedComplaint = complaintRepository.save(complaint);

	    notificationService.createNotification(
	            complaint.getCitizen(),
	            complaint,
	            NotificationType.AI_RECOMMENDATION_ACCEPTED,
	            NotificationMessages.UNDER_REVIEW_TITLE,
	            "Your complaint "
	                    + complaint.getComplaintId()
	                    + " is now under review.");
	    
	    complaintHistoryService.recordHistory(
	            updatedComplaint,
	            ComplaintHistoryAction.AI_RECOMMENDATION_ACCEPTED,
	            manager,
	            ComplaintStatus.OPEN.name(),
	            ComplaintStatus.UNDER_REVIEW.name(),
	            "Department Manager accepted AI recommendation.");

	    return complaintMapper.toResponse(updatedComplaint);
	}
	
	private void validateComplaintForAIAcceptance(
	        Complaint complaint,
	        AIAnalysis aiAnalysis) {

	    if (complaint.getStatus() != ComplaintStatus.OPEN) {
	    	throw new InvalidComplaintStateException(
	    	        "AI recommendation can only be accepted for OPEN complaints.");
	    }

	    if (aiAnalysis.getSuggestedDepartment() == null) {
	        throw new AIAnalysisException(
	                "AI did not suggest a department.");
	    }

	    if (aiAnalysis.getPriority() == null) {
	        throw new AIAnalysisException(
	                "AI did not suggest a priority.");
	    }
	}
	
	private void applyAIRecommendation(
	        Complaint complaint,
	        AIAnalysis aiAnalysis) {

	    complaint.setDepartment(aiAnalysis.getSuggestedDepartment());

	    complaint.setPriority(aiAnalysis.getPriority());

	    complaint.setStatus(ComplaintStatus.UNDER_REVIEW);
	}

	@Override
	@Transactional(readOnly = true)
	public List<OfficerResponse> getAvailableOfficers() {

	    User manager = currentUserService.getCurrentUser();

	    Department department = manager.getDepartment();

	    if (department == null) {
	        throw new DepartmentNotFoundException(
	                "Department Manager is not assigned to any department.");
	    }

	    List<User> officers = userRepository.findByRole_RoleTypeAndDepartment(
	                    RoleType.OFFICER,
	                    department);

	    return officers.stream()
	            .map(departmentManagerMapper::toOfficerResponse)
	            .toList();
	}

	@Override
	@Transactional
	public ComplaintResponse assignOfficer(String complaintId, AssignOfficerRequest request) {

	    User manager = currentUserService.getCurrentUser();

	    AIAnalysis aiAnalysis = aiAnalysisRepository
	            .findByComplaint_ComplaintId(complaintId)
	            .orElseThrow(() -> new AIAnalysisException(
	                    "AI analysis not found for complaint: " + complaintId));

	    validateDepartmentAccess(manager, aiAnalysis);

	    Complaint complaint = aiAnalysis.getComplaint();

	    validateComplaintForAssignment(complaint);

	    User officer = userRepository.findByUserId(request.getOfficerId())
	            .orElseThrow(() -> new UserNotFoundException(
	                    "Officer not found with ID: " + request.getOfficerId()));

	    validateOfficer(manager, officer);

	    assignOfficerToComplaint(complaint, officer);

	    Complaint updatedComplaint = complaintRepository.save(complaint);

	    notificationService.createNotification(
	            officer,
	            complaint,
	            NotificationType.OFFICER_ASSIGNED,
	            NotificationMessages.OFFICER_ASSIGNED_TITLE,
	            "Complaint "
	                    + complaint.getComplaintId()
	                    + " has been assigned to you.");
	    
	    notificationService.createNotification(
	            complaint.getCitizen(),
	            complaint,
	            NotificationType.COMPLAINT_ASSIGNED,
	            "Complaint Assigned",
	            "Your complaint "
	                    + complaint.getComplaintId()
	                    + " has been assigned to an officer and is now being processed.");
	    
	    complaintHistoryService.recordHistory(
	            updatedComplaint,
	            ComplaintHistoryAction.OFFICER_ASSIGNED,
	            manager,
	            null,
	            officer.getUserId(),
	            "Complaint assigned to "
	                    + officer.getFirstName()
	                    + " "
	                    + officer.getLastName());

	    return complaintMapper.toResponse(updatedComplaint);
	}
	
	@Override
	@Transactional(readOnly = true)
	public DepartmentDashboardResponse getDashboard() {

	    User manager = currentUserService.getCurrentUser();

	    Department department = manager.getDepartment();

	    if (department == null) {
	        throw new DepartmentNotFoundException(
	                "Department Manager is not assigned to any department.");
	    }

	    return DepartmentDashboardResponse.builder()
	            .pendingReviewComplaints(
	                    complaintRepository.countByDepartmentAndStatus(
	                            department,
	                            ComplaintStatus.UNDER_REVIEW))
	            .assignedComplaints(
	                    complaintRepository.countByDepartmentAndStatus(
	                            department,
	                            ComplaintStatus.ASSIGNED))
	            .inProgressComplaints(
	                    complaintRepository.countByDepartmentAndStatus(
	                            department,
	                            ComplaintStatus.IN_PROGRESS))
	            .resolvedComplaints(
	                    complaintRepository.countByDepartmentAndStatus(
	                            department,
	                            ComplaintStatus.RESOLVED))
	            .criticalComplaints(
	                    complaintRepository.countByDepartmentAndPriority(
	                            department,
	                            ComplaintPriority.CRITICAL))
	            .build();
	}
	
	@Override
	@Transactional
	public ComplaintResponse overrideAIRecommendation(
	        String complaintId,
	        OverrideAIRecommendationRequest request) {

	    User manager = currentUserService.getCurrentUser();

	    AIAnalysis aiAnalysis = aiAnalysisRepository
	            .findByComplaint_ComplaintId(complaintId)
	            .orElseThrow(() -> new AIAnalysisException(
	                    "AI analysis not found for complaint: " + complaintId));

	    validateDepartmentAccess(manager, aiAnalysis);

	    Complaint complaint = aiAnalysis.getComplaint();

	    validateComplaintForAIAcceptance(complaint, aiAnalysis);

	    Department department = departmentRepository.findById(request.getDepartmentId())
	            .orElseThrow(() -> new DepartmentNotFoundException(
	                    "Department not found with ID: " + request.getDepartmentId()));

	    // Store old values for complaint history
	    Department oldDepartment = aiAnalysis.getSuggestedDepartment();
	    ComplaintPriority oldPriority = aiAnalysis.getPriority();

	    // Update complaint
	    complaint.setDepartment(department);
	    complaint.setPriority(request.getPriority());
	    complaint.setStatus(ComplaintStatus.UNDER_REVIEW);

	    // Update AI analysis
	    aiAnalysis.setSuggestedDepartment(department);
	    aiAnalysis.setPriority(request.getPriority());
	    aiAnalysis.setRemarks(request.getRemarks());

	    aiAnalysisRepository.save(aiAnalysis);

	    Complaint updatedComplaint = complaintRepository.save(complaint);

	    // Notify citizen
	    notificationService.createNotification(
	            complaint.getCitizen(),
	            complaint,
	            NotificationType.AI_RECOMMENDATION_ACCEPTED,
	            NotificationMessages.UNDER_REVIEW_TITLE,
	            "Your complaint "
	                    + complaint.getComplaintId()
	                    + " is under review after the Department Manager updated the AI recommendation.");

	    // Record complaint history
	    complaintHistoryService.recordHistory(
	            updatedComplaint,
	            ComplaintHistoryAction.AI_RECOMMENDATION_OVERRIDDEN,
	            manager,
	            "Department: "
	                    + (oldDepartment != null
	                            ? oldDepartment.getDepartmentName()
	                            : "None")
	                    + ", Priority: "
	                    + oldPriority,
	            "Department: "
	                    + department.getDepartmentName()
	                    + ", Priority: "
	                    + request.getPriority(),
	            request.getRemarks());

	    return complaintMapper.toResponse(updatedComplaint);
	}
	
	private void validateComplaintForAssignment(Complaint complaint) {

	    if (complaint.getStatus() != ComplaintStatus.UNDER_REVIEW) {
	        throw new InvalidComplaintStateException(
	                "Only complaints under review can be assigned to an officer.");
	    }

	    if (complaint.getAssignedOfficer() != null) {
	        throw new InvalidComplaintStateException(
	                "Complaint is already assigned to an officer.");
	    }
	}
	
	private void validateOfficer(User manager, User officer) {

	    if (officer.getRole().getRoleType() != RoleType.OFFICER) {
	        throw new InvalidComplaintStateException(
	                "Selected user is not an officer.");
	    }

	    if (officer.getDepartment() == null) {
	        throw new DepartmentNotFoundException(
	                "Officer is not assigned to any department.");
	    }

	    if (!manager.getDepartment()
	            .getDepartmentId()
	            .equals(officer.getDepartment().getDepartmentId())) {

	        throw new InvalidComplaintStateException(
	                "Officer does not belong to your department.");
	    }
	}
	
	private void assignOfficerToComplaint(
	        Complaint complaint,
	        User officer) {

	    complaint.setAssignedOfficer(officer);
	    complaint.setStatus(ComplaintStatus.ASSIGNED);
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<DepartmentComplaintResponse> getActiveComplaints() {

	    User manager = currentUserService.getCurrentUser();

	    Department department = manager.getDepartment();

	    if (department == null) {
	        throw new DepartmentNotFoundException(
	                "Department Manager is not assigned to any department.");
	    }

	    List<Complaint> complaints =
	            complaintRepository.findByDepartmentAndStatusIn(
	                    department,
	                    List.of(
	                            ComplaintStatus.ASSIGNED,
	                            ComplaintStatus.IN_PROGRESS));

	    return complaints.stream()
	            .map(complaintMapper::toDepartmentComplaintResponse)
	            .toList();
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<DepartmentComplaintResponse> getResolvedComplaints() {

	    User manager = currentUserService.getCurrentUser();

	    Department department = manager.getDepartment();

	    if (department == null) {
	        throw new DepartmentNotFoundException(
	                "Department Manager is not assigned to any department.");
	    }

	    List<Complaint> complaints =
	            complaintRepository.findByDepartmentAndStatus(
	                    department,
	                    ComplaintStatus.RESOLVED);

	    return complaints.stream()
	            .map(complaintMapper::toDepartmentComplaintResponse)
	            .toList();
	}

}
