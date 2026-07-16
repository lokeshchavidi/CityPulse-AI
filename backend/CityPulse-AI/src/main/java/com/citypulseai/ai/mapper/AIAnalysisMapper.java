package com.citypulseai.ai.mapper;

import org.springframework.stereotype.Component;

import com.citypulseai.ai.dto.AIAnalysisRequest;
import com.citypulseai.ai.dto.AIAnalysisResponse;
import com.citypulseai.ai.entity.AIAnalysis;
import com.citypulseai.ai.enums.AIAnalysisStatus;
import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.department.entity.Department;

@Component
public class AIAnalysisMapper {

	public AIAnalysis toEntity(
	        String analysisId,
	        Complaint complaint,
	        Department department,
	        AIAnalysisResponse response,
	        String model,
	        Long processingTime) {

	    return AIAnalysis.builder()
	            .analysisId(analysisId)
	            .complaint(complaint)
	            .category(response.getCategory())
	            .severity(response.getSeverity())
	            .priority(response.getPriority())
	            .suggestedDepartment(department)
	            .summary(response.getSummary())
	            .confidenceScore(response.getConfidenceScore())
	            .imageVerified(response.getImageVerified())
	            .textImageConsistent(response.getTextImageConsistent())
	            .emergencyDetected(response.getEmergencyDetected())
	            .duplicateComplaint(response.getDuplicateComplaint())
	            .duplicateReason(response.getDuplicateReason())
	            .remarks(response.getRemarks())
	            .status(AIAnalysisStatus.COMPLETED)
	            .aiModel(model)
	            .processingTimeInMs(processingTime)
	            .build();
	}
    
    public AIAnalysisRequest toRequest(Complaint complaint) {

        return AIAnalysisRequest.builder()
                .complaintId(complaint.getComplaintId())
                .title(complaint.getTitle())
                .description(complaint.getDescription())
                .imageUrl(complaint.getImageUrl())
                .latitude(complaint.getLatitude())
                .longitude(complaint.getLongitude())
                .address(complaint.getAddress())
                .build();
    }

    public AIAnalysisResponse toResponse(AIAnalysis analysis) {

        return AIAnalysisResponse.builder()
                .category(analysis.getCategory())
                .severity(analysis.getSeverity())
                .priority(analysis.getPriority())
                .suggestedDepartment(analysis.getSuggestedDepartment() != null
                        ? analysis.getSuggestedDepartment().getDepartmentName()
                                : null)
                .summary(analysis.getSummary())
                .confidenceScore(analysis.getConfidenceScore())
                .imageVerified(analysis.getImageVerified())
                .textImageConsistent(analysis.getTextImageConsistent())
                .emergencyDetected(analysis.getEmergencyDetected())
                .duplicateComplaint(analysis.getDuplicateComplaint())
                .duplicateReason(analysis.getDuplicateReason())
                .remarks(analysis.getRemarks())
                .build();
    }

}