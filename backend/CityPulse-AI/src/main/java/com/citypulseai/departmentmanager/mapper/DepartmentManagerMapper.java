package com.citypulseai.departmentmanager.mapper;

import org.springframework.stereotype.Component;

import com.citypulseai.ai.entity.AIAnalysis;
import com.citypulseai.ai.enums.AIAnalysisStatus;
import com.citypulseai.ai.mapper.AIAnalysisMapper;
import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.complaint.entity.ComplaintStatus;
import com.citypulseai.complaint.enums.ComplaintPriority;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintDetailsResponse;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintResponse;
import com.citypulseai.departmentmanager.dto.OfficerResponse;
import com.citypulseai.user.entity.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DepartmentManagerMapper {
	
	private final AIAnalysisMapper aiAnalysisMapper;

    public DepartmentComplaintResponse toComplaintResponse(AIAnalysis aiAnalysis) {

        Complaint complaint = aiAnalysis.getComplaint();

        return DepartmentComplaintResponse.builder()
                .complaintId(complaint.getComplaintId())
                .title(complaint.getTitle())
                .priority(displayPriority(complaint, aiAnalysis))
                .status(complaint.getStatus())
                .citizenName(complaint.getCitizen().getFirstName() + " " +
                             complaint.getCitizen().getLastName())
                .address(complaint.getAddress())
                .createdAt(complaint.getCreatedAt())
                .build();
    }
    
    public DepartmentComplaintDetailsResponse toComplaintDetailsResponse(
            AIAnalysis aiAnalysis) {

        Complaint complaint = aiAnalysis.getComplaint();

        User citizen = complaint.getCitizen();

        User assignedOfficer = complaint.getAssignedOfficer();

        return DepartmentComplaintDetailsResponse.builder()
                .complaintId(complaint.getComplaintId())
                .title(complaint.getTitle())
                .description(complaint.getDescription())
                .latitude(complaint.getLatitude())
                .longitude(complaint.getLongitude())
                .address(complaint.getAddress())
                .imageUrl(complaint.getImageUrl())
                .status(complaint.getStatus())
                .priority(complaint.getPriority())

                // Citizen
                .citizenId(citizen.getUserId())
                .citizenName(citizen.getFirstName() + " " + citizen.getLastName())
                .citizenEmail(citizen.getEmail())
                .citizenPhoneNumber(citizen.getPhoneNumber())

                // Department
                .departmentName(
                        complaint.getDepartment() != null
                                ? complaint.getDepartment().getDepartmentName()
                                : null)

                // Assigned Officer
                .assignedOfficerId(
                        assignedOfficer != null
                                ? assignedOfficer.getUserId()
                                : null)

                .assignedOfficerName(
                        assignedOfficer != null
                                ? assignedOfficer.getFirstName() + " " + assignedOfficer.getLastName()
                                : null)

                // A failed analysis has no classification to show.
                .aiAnalysis(aiAnalysis.getStatus() == AIAnalysisStatus.FAILED
                        ? null
                        : aiAnalysisMapper.toResponse(aiAnalysis))

                .createdAt(complaint.getCreatedAt())
                .build();
    }
    
    /**
     * Until a manager accepts the recommendation, the complaint row still
     * holds the default MEDIUM priority. The queue should show the priority
     * the AI actually suggested.
     */
    private ComplaintPriority displayPriority(Complaint complaint, AIAnalysis aiAnalysis) {
        if (complaint.getStatus() == ComplaintStatus.OPEN
                && aiAnalysis.getStatus() == AIAnalysisStatus.COMPLETED
                && aiAnalysis.getPriority() != null) {
            return aiAnalysis.getPriority();
        }

        return complaint.getPriority();
    }

    public OfficerResponse toOfficerResponse(User officer) {

        return OfficerResponse.builder()
                .officerId(officer.getUserId())
                .officerName(officer.getFirstName() + " " + officer.getLastName())
                .email(officer.getEmail())
                .phoneNumber(officer.getPhoneNumber())
                .build();
    }

}