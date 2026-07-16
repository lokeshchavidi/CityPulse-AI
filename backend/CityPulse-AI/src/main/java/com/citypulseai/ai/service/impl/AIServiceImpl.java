package com.citypulseai.ai.service.impl;

import java.util.List;

import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.content.Media;
import org.springframework.ai.google.genai.GoogleGenAiChatModel;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citypulseai.ai.config.AIProperties;
import com.citypulseai.ai.dto.AIAnalysisRequest;
import com.citypulseai.ai.dto.AIAnalysisResponse;
import com.citypulseai.ai.entity.AIAnalysis;
import com.citypulseai.ai.exception.AIAnalysisException;
import com.citypulseai.ai.mapper.AIAnalysisMapper;
import com.citypulseai.ai.mapper.AIDepartmentMapper;
import com.citypulseai.ai.provider.AIProvider;
import com.citypulseai.ai.repository.AIAnalysisRepository;
import com.citypulseai.ai.service.AIService;
import com.citypulseai.ai.util.AnalysisIdGenerator;
import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.complaint.enums.ComplaintHistoryAction;
import com.citypulseai.complaint.exception.ComplaintNotFoundException;
import com.citypulseai.complaint.repository.ComplaintRepository;
import com.citypulseai.complaint.service.ComplaintHistoryService;
import com.citypulseai.department.entity.Department;
import com.citypulseai.department.exception.DepartmentNotFoundException;
import com.citypulseai.department.repository.DepartmentRepository;
import com.citypulseai.notification.dto.NotificationMessages;
import com.citypulseai.notification.entity.NotificationType;
import com.citypulseai.notification.service.NotificationService;
import com.citypulseai.role.enums.RoleType;
import com.citypulseai.user.entity.User;
import com.citypulseai.user.exception.UserNotFoundException;
import com.citypulseai.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AIServiceImpl implements AIService {

    private final ComplaintRepository complaintRepository;
    
    private final DepartmentRepository departmentRepository;

    private final AIAnalysisRepository aiAnalysisRepository;

    private final AIAnalysisMapper aiAnalysisMapper;

    private final AIProvider aiProvider;

    private final AnalysisIdGenerator analysisIdGenerator;

    private final AIProperties aiProperties;
    
    private final AIDepartmentMapper aiDepartmentMapper;
    
    private final ComplaintHistoryService complaintHistoryService;

    private final NotificationService notificationService;

    private final UserRepository userRepository;

    private final com.citypulseai.common.service.CurrentUserService currentUserService;

    private final com.citypulseai.complaint.service.ComplaintAccessValidator complaintAccessValidator;
    
    @Override
    @Async
    @Transactional
    public void analyzeComplaint(String complaintId) {

        try {

            log.info("Starting AI analysis for complaint {}", complaintId);

            long startTime = System.currentTimeMillis();

            Complaint complaint = findComplaint(complaintId);

            validateAnalysisDoesNotExist(complaintId);

            AIAnalysisRequest request = aiAnalysisMapper.toRequest(complaint);

            AIAnalysisResponse response = aiProvider.analyzeComplaint(request);

            log.info("AI Category           : {}", response.getCategory());
            log.info("AI Severity           : {}", response.getSeverity());
            log.info("AI Priority           : {}", response.getPriority());
            log.info("AI Suggested Dept     : {}", response.getSuggestedDepartment());
            
            String mappedDepartment =
                    aiDepartmentMapper.mapDepartment(response.getSuggestedDepartment());
            
            Department department = findSuggestedDepartment(mappedDepartment);
            
            long processingTime = System.currentTimeMillis() - startTime;

            AIAnalysis analysis = aiAnalysisMapper.toEntity(
                    analysisIdGenerator.generateAnalysisId(),
                    complaint,
                    department,
                    response,
                    aiProperties.getModel(),
                    processingTime
            );

            AIAnalysis savedAnalysis = saveAnalysis(analysis);
            
            List<User> managers = userRepository.findByRole_RoleTypeAndDepartment(
                    RoleType.DEPARTMENT_MANAGER,
                    department);

            if (managers.isEmpty()) {
                throw new UserNotFoundException(
                        "Department Manager not found for department: "
                                + department.getDepartmentName());
            }

            User departmentManager = managers.get(0);
            
            notificationService.createNotification(
                    departmentManager,
                    complaint,
                    NotificationType.AI_ANALYSIS_COMPLETED,
                    NotificationMessages.NEW_COMPLAINT_ASSIGNED_TITLE,
                    "Complaint " + complaint.getComplaintId()
                            + " has been assigned to your department and is awaiting your review.");

            notificationService.createNotification(
                    complaint.getCitizen(),
                    complaint,
                    NotificationType.AI_ANALYSIS_COMPLETED,
                    NotificationMessages.AI_ANALYSIS_COMPLETED_TITLE,
                    "AI analysis has been completed for complaint "
                            + complaint.getComplaintId() + ".");
            
            complaintHistoryService.recordHistory(
                    complaint,
                    ComplaintHistoryAction.AI_ANALYSIS_COMPLETED,
                    null,
                    null,
                    savedAnalysis.getSuggestedDepartment().getDepartmentName(),
                    "AI analysis completed successfully.");

            log.info("AI analysis completed successfully for complaint {}", complaintId);

        } catch (Exception ex) {

            log.error("AI analysis failed for complaint {}", complaintId, ex);

            // Previously this was fully silent: the complaint's status
            // stays OPEN, the Department Manager queue only surfaces
            // OPEN complaints that already HAVE an AIAnalysis row, so a
            // failed analysis meant the complaint vanished — no manager
            // ever saw it, no citizen was told, and no admin knew to step
            // in. At minimum, alert every Admin so it can be manually
            // triaged via the (now Admin-only) manual assignDepartment /
            // assignOfficer endpoints, and let the citizen know their
            // complaint is still being looked at rather than leaving them
            // wondering why nothing is happening.
            try {
                Complaint complaint = findComplaint(complaintId);

                notificationService.createNotification(
                        complaint.getCitizen(),
                        complaint,
                        NotificationType.GENERAL,
                        "Complaint Received",
                        "Your complaint " + complaint.getComplaintId()
                                + " was received and is being reviewed by our team. "
                                + "Automatic analysis is taking a little longer than usual.");
            } catch (Exception notifyCitizenEx) {
                log.error("Failed to notify citizen about AI analysis failure for complaint {}",
                        complaintId, notifyCitizenEx);
            }

            try {
                List<User> admins = userRepository.findByRole_RoleType(RoleType.ADMIN);

                for (User admin : admins) {
                    notificationService.createNotification(
                            admin,
                            null,
                            NotificationType.GENERAL,
                            "AI Analysis Failed",
                            "Automatic AI analysis failed for complaint " + complaintId
                                    + ". It will not appear in any department queue until "
                                    + "manually reviewed and assigned.");
                }
            } catch (Exception notifyEx) {
                log.error("Failed to notify admins about AI analysis failure for complaint {}",
                        complaintId, notifyEx);
            }
        }
    }
	
	private Complaint findComplaint(String complaintId) {

	    return complaintRepository.findByComplaintId(complaintId)
	            .orElseThrow(() ->
	                    new ComplaintNotFoundException(AppConstants.COMPLAINT_NOT_FOUND));
	}
	
	private void validateAnalysisDoesNotExist(String complaintId) {

	    if (aiAnalysisRepository.existsByComplaint_ComplaintId(complaintId)) {
	        throw new AIAnalysisException("AI analysis already exists for complaint : " + complaintId);
	    }

	}
	
	private Department findSuggestedDepartment(String departmentName) {

	    return departmentRepository.findByDepartmentNameIgnoreCase(departmentName.trim())
	            .orElseThrow(() ->
	                    new DepartmentNotFoundException(
	                            "Department not found: " + departmentName));
	}
	
	private AIAnalysis saveAnalysis(AIAnalysis analysis) {
	    return aiAnalysisRepository.save(analysis);
	}

	@Override
	@Transactional(readOnly = true)
	public AIAnalysisResponse getAnalysisByComplaintId(String complaintId) {

	    Complaint complaint = findComplaint(complaintId);

	    // Same guessable-ID problem as complaint details/history: without
	    // this check, any authenticated Citizen/Officer/Manager could read
	    // the AI's severity/department/remarks for a complaint that isn't
	    // theirs, isn't assigned to them, or isn't in their department.
	    complaintAccessValidator.validateAccess(complaint, currentUserService.getCurrentUser());

	    AIAnalysis analysis = aiAnalysisRepository
	            .findByComplaint_ComplaintId(complaintId)
	            .orElseThrow(() -> new AIAnalysisException(
	                    "AI analysis not found for complaint: " + complaintId));

	    return aiAnalysisMapper.toResponse(analysis);
	}
	

}