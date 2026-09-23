package com.citypulseai.complaint.mapper;

import org.springframework.stereotype.Component;

import com.citypulseai.complaint.dto.ComplaintResponse;
import com.citypulseai.complaint.dto.CreateComplaintRequest;
import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintResponse;

@Component
public class ComplaintMapper {

    /**
     * Maps CreateComplaintRequest to Complaint entity.
     * Business fields like complaintId, citizen, status, priority,
     * department and assignedOfficer are set in the service layer.
     */
    public Complaint toEntity(CreateComplaintRequest request) {

        return Complaint.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .address(request.getAddress())
                .build();
    }

    /**
     * Maps Complaint entity to ComplaintResponse.
     */
    public ComplaintResponse toResponse(Complaint complaint) {

        return ComplaintResponse.builder()
                .complaintId(complaint.getComplaintId())
                .title(complaint.getTitle())
                .description(complaint.getDescription())
                .latitude(complaint.getLatitude())
                .longitude(complaint.getLongitude())
                .address(complaint.getAddress())
                .imageUrl(complaint.getImageUrl())
                .status(complaint.getStatus())
                .priority(complaint.getPriority())
                .departmentName(
                        complaint.getDepartment() != null
                                ? complaint.getDepartment().getDepartmentName()
                                : null)
                .assignedOfficerName(
                        complaint.getAssignedOfficer() != null
                                ? complaint.getAssignedOfficer().getFirstName() + " "
                                        + complaint.getAssignedOfficer().getLastName()
                                : null)
                .citizenName(
                        complaint.getCitizen() != null
                                ? complaint.getCitizen().getFirstName() + " "
                                        + complaint.getCitizen().getLastName()
                                : null)
                .createdAt(complaint.getCreatedAt())
                .build();
    }
    
    public DepartmentComplaintResponse toDepartmentComplaintResponse(
            Complaint complaint) {

        return DepartmentComplaintResponse.builder()
                .complaintId(complaint.getComplaintId())
                .title(complaint.getTitle())
                .priority(complaint.getPriority())
                .status(complaint.getStatus())
                .citizenName(
                        complaint.getCitizen().getFirstName() + " "
                        + complaint.getCitizen().getLastName())
                .address(complaint.getAddress())
                .createdAt(complaint.getCreatedAt())
                .build();
    }
}