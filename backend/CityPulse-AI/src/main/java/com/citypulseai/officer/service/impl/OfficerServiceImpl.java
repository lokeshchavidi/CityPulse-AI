package com.citypulseai.officer.service.impl;

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
import com.citypulseai.complaint.mapper.ComplaintMapper;
import com.citypulseai.complaint.repository.ComplaintRepository;
import com.citypulseai.complaint.service.ComplaintHistoryService;
import com.citypulseai.department.exception.DepartmentNotFoundException;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintDetailsResponse;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintResponse;
import com.citypulseai.departmentmanager.exception.InvalidComplaintStateException;
import com.citypulseai.departmentmanager.mapper.DepartmentManagerMapper;
import com.citypulseai.notification.dto.NotificationMessages;
import com.citypulseai.notification.entity.NotificationType;
import com.citypulseai.notification.service.NotificationService;
import com.citypulseai.officer.dto.OfficerDashboardResponse;
import com.citypulseai.officer.dto.ResolveComplaintRequest;
import com.citypulseai.officer.service.OfficerService;
import com.citypulseai.role.enums.RoleType;
import com.citypulseai.statistics.dto.ComplaintStatisticsResponse;
import com.citypulseai.statistics.service.ComplaintStatisticsService;
import com.citypulseai.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OfficerServiceImpl implements OfficerService {

    private final ComplaintRepository complaintRepository;
    private final ComplaintMapper complaintMapper;
    private final CurrentUserService currentUserService;
    private final AIAnalysisRepository aiAnalysisRepository;
    private final DepartmentManagerMapper departmentManagerMapper;
    private final ComplaintHistoryService complaintHistoryService;
    private final NotificationService notificationService;
    private final ComplaintStatisticsService complaintStatisticsService;
    
    @Override
    @Transactional(readOnly = true)
    public List<DepartmentComplaintResponse> getMyAssignedComplaints() {

        User officer = getCurrentOfficer();

        // Was findByAssignedOfficerAndStatus(officer, ASSIGNED) — the
        // frontend's "Assigned Complaints" page has All/Assigned/
        // In Progress/Resolved filter tabs and filters client-side, but the
        // backend only ever returned ASSIGNED-status rows. The moment an
        // officer called startWork() on a complaint (-> IN_PROGRESS), it
        // disappeared from their list entirely — they lost all visibility
        // into their own in-progress and resolved work.
        //
        // This method was also missing @Transactional entirely. With
        // spring.jpa.open-in-view=false (see application.properties), the
        // Hibernate session closes as soon as the repository call returns.
        // complaintMapper.toDepartmentComplaintResponse() below then calls
        // complaint.getCitizen().getFirstName() — citizen is a LAZY
        // association — outside of any active session, which throws a
        // LazyInitializationException. That exception fell through to the
        // generic 500 handler, so every call to GET /api/v1/officer/complaints
        // failed and the officer's "Assigned Complaints" page always
        // rendered empty, no matter how many complaints were actually
        // assigned to them. Adding @Transactional(readOnly = true) keeps
        // the session open for the duration of the mapping.
        List<Complaint> complaints =
                complaintRepository.findByAssignedOfficer(officer);

        return complaints.stream()
                .map(complaintMapper::toDepartmentComplaintResponse)
                .toList();
    }

    private User getCurrentOfficer() {

        User officer = currentUserService.getCurrentUser();

        if (officer.getRole().getRoleType() != RoleType.OFFICER) {
            throw new AccessDeniedException(
                    "Only officers can access this resource.");
        }

        if (officer.getDepartment() == null) {
            throw new DepartmentNotFoundException(
                    "Officer is not assigned to any department.");
        }

        return officer;
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentComplaintDetailsResponse getComplaintDetails(String complaintId) {

        User officer = getCurrentOfficer();

        AIAnalysis aiAnalysis = aiAnalysisRepository
                .findByComplaint_ComplaintId(complaintId)
                .orElseThrow(() -> new AIAnalysisException(
                        "AI analysis not found for complaint: " + complaintId));

        Complaint complaint = aiAnalysis.getComplaint();

        validateOfficerAccess(officer, complaint);

        return departmentManagerMapper.toComplaintDetailsResponse(aiAnalysis);
    }
    
    @Override
    @Transactional
    public ComplaintResponse startWork(String complaintId) {

        User officer = getCurrentOfficer();

        AIAnalysis aiAnalysis = aiAnalysisRepository
                .findByComplaint_ComplaintId(complaintId)
                .orElseThrow(() -> new AIAnalysisException(
                        "AI analysis not found for complaint: " + complaintId));

        Complaint complaint = aiAnalysis.getComplaint();

        validateOfficerAccess(officer, complaint);

        validateComplaintForStartWork(complaint);

        complaint.setStatus(ComplaintStatus.IN_PROGRESS);

        Complaint updatedComplaint = complaintRepository.save(complaint);

        notificationService.createNotification(
                complaint.getCitizen(),
                complaint,
                NotificationType.WORK_STARTED,
                NotificationMessages.WORK_STARTED_TITLE,
                "Work has started on your complaint "
                        + complaint.getComplaintId() + ".");
        
        
        complaintHistoryService.recordHistory(
                updatedComplaint,
                ComplaintHistoryAction.STATUS_CHANGED,
                officer,
                ComplaintStatus.ASSIGNED.name(),
                ComplaintStatus.IN_PROGRESS.name(),
                "Officer started working on the complaint.");

        return complaintMapper.toResponse(updatedComplaint);
    }
    
    @Override
    @Transactional
    public ComplaintResponse resolveComplaint(
            String complaintId,
            ResolveComplaintRequest request) {

        User officer = getCurrentOfficer();

        AIAnalysis aiAnalysis = aiAnalysisRepository
                .findByComplaint_ComplaintId(complaintId)
                .orElseThrow(() ->
                        new AIAnalysisException(
                                "AI analysis not found for complaint: "
                                        + complaintId));

        Complaint complaint = aiAnalysis.getComplaint();

        validateOfficerAccess(officer, complaint);

        validateComplaintForResolution(complaint);

        complaint.setStatus(ComplaintStatus.RESOLVED);

        Complaint updatedComplaint = complaintRepository.save(complaint);

        notificationService.createNotification(
                complaint.getCitizen(),
                complaint,
                NotificationType.COMPLAINT_RESOLVED,
                NotificationMessages.COMPLAINT_RESOLVED_TITLE,
                "Your complaint "
                        + complaint.getComplaintId()
                        + " has been resolved successfully.");
        
        complaintHistoryService.recordHistory(
                updatedComplaint,
                ComplaintHistoryAction.RESOLVED,
                officer,
                ComplaintStatus.IN_PROGRESS.name(),
                ComplaintStatus.RESOLVED.name(),
                request.getRemarks());

        return complaintMapper.toResponse(updatedComplaint);
    }
    
    private void validateComplaintForResolution(Complaint complaint) {

        if (complaint.getStatus() != ComplaintStatus.IN_PROGRESS) {
            throw new InvalidComplaintStateException(
                    "Only IN_PROGRESS complaints can be resolved.");
        }
    }
    
    private void validateComplaintForStartWork(Complaint complaint) {

        if (complaint.getStatus() != ComplaintStatus.ASSIGNED) {
            throw new InvalidComplaintStateException(
                    "Only ASSIGNED complaints can be moved to IN_PROGRESS.");
        }
    }
    
    private void validateOfficerAccess(User officer, Complaint complaint) {

        User assignedOfficer = complaint.getAssignedOfficer();

        if (assignedOfficer == null) {
            throw new AccessDeniedException(
                    "Complaint is not assigned to any officer.");
        }

        if (!assignedOfficer.getUserId().equals(officer.getUserId())) {
            throw new AccessDeniedException(
                    "You are not authorized to access this complaint.");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public OfficerDashboardResponse getDashboard() {

        User officer = currentUserService.getCurrentUser();

        return OfficerDashboardResponse.builder()
                .assignedComplaints(
                        complaintRepository.countByAssignedOfficerAndStatus(
                                officer,
                                ComplaintStatus.ASSIGNED))
                .inProgressComplaints(
                        complaintRepository.countByAssignedOfficerAndStatus(
                                officer,
                                ComplaintStatus.IN_PROGRESS))
                .resolvedComplaints(
                        complaintRepository.countByAssignedOfficerAndStatus(
                                officer,
                                ComplaintStatus.RESOLVED))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public ComplaintStatisticsResponse getStatistics() {
        User officer = currentUserService.getCurrentUser();
        return complaintStatisticsService.getOfficerStatistics(officer);
    }
}