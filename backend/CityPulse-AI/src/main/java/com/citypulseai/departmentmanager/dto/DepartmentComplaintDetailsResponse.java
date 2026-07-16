package com.citypulseai.departmentmanager.dto;

import java.time.LocalDateTime;

import com.citypulseai.ai.dto.AIAnalysisResponse;
import com.citypulseai.complaint.entity.ComplaintStatus;
import com.citypulseai.complaint.enums.ComplaintPriority;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentComplaintDetailsResponse {

    // Complaint Details
    private String complaintId;
    private String title;
    private String description;
    private Double latitude;
    private Double longitude;
    private String address;
    private String imageUrl;

    private ComplaintStatus status;
    private ComplaintPriority priority;

    // Citizen
    private String citizenId;
    private String citizenName;
    private String citizenEmail;
    private String citizenPhoneNumber;

    // Department
    private String departmentName;

    // Assigned Officer
    private String assignedOfficerId;
    private String assignedOfficerName;

    // AI Analysis
    private AIAnalysisResponse aiAnalysis;

    private LocalDateTime createdAt;
}