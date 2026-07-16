package com.citypulseai.officer.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.common.response.ApiResponse;
import com.citypulseai.complaint.dto.ComplaintResponse;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintDetailsResponse;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintResponse;
import com.citypulseai.officer.dto.OfficerDashboardResponse;
import com.citypulseai.officer.dto.ResolveComplaintRequest;
import com.citypulseai.officer.service.OfficerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/officer")
@RequiredArgsConstructor
public class OfficerController {

    private final OfficerService officerService;

    @GetMapping("/complaints")
    @PreAuthorize("hasRole('OFFICER')")
    public ResponseEntity<ApiResponse<List<DepartmentComplaintResponse>>> getMyAssignedComplaints() {

        List<DepartmentComplaintResponse> complaints =
                officerService.getMyAssignedComplaints();

        ApiResponse<List<DepartmentComplaintResponse>> response =
                ApiResponse.<List<DepartmentComplaintResponse>>builder()
                        .success(true)
                        .message(AppConstants.ASSIGNED_COMPLAINTS_RETRIEVED_SUCCESSFULLY)
                        .data(complaints)
                        .build();

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/complaints/{complaintId}")
    @PreAuthorize("hasRole('OFFICER')")
    public ResponseEntity<ApiResponse<DepartmentComplaintDetailsResponse>>
            getComplaintDetails(@PathVariable String complaintId) {

        DepartmentComplaintDetailsResponse response =
                officerService.getComplaintDetails(complaintId);

        return ResponseEntity.ok(
                ApiResponse.<DepartmentComplaintDetailsResponse>builder()
                        .success(true)
                        .message("Complaint details retrieved successfully.")
                        .data(response)
                        .build());
    }
    
    @PatchMapping("/complaints/{complaintId}/start")
    @PreAuthorize("hasRole('OFFICER')")
    public ResponseEntity<ApiResponse<ComplaintResponse>> startWork(
            @PathVariable String complaintId) {

        ComplaintResponse complaint =
                officerService.startWork(complaintId);

        return ResponseEntity.ok(
                ApiResponse.<ComplaintResponse>builder()
                        .success(true)
                        .message("Work started successfully.")
                        .data(complaint)
                        .build());
    }
    
    @PostMapping("/complaints/{complaintId}/resolve")
    @PreAuthorize("hasRole('OFFICER')")
    public ResponseEntity<ApiResponse<ComplaintResponse>> resolveComplaint(
            @PathVariable String complaintId,
            @Valid @RequestBody ResolveComplaintRequest request) {

        ComplaintResponse response =
                officerService.resolveComplaint(
                        complaintId,
                        request);

        return ResponseEntity.ok(
                ApiResponse.<ComplaintResponse>builder()
                        .success(true)
                        .message("Complaint resolved successfully.")
                        .data(response)
                        .build());
    }
    
    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('OFFICER')")
    public ResponseEntity<ApiResponse<OfficerDashboardResponse>> getDashboard() {

        OfficerDashboardResponse response =
                officerService.getDashboard();

        return ResponseEntity.ok(
                ApiResponse.<OfficerDashboardResponse>builder()
                        .success(true)
                        .message("Officer dashboard retrieved successfully.")
                        .data(response)
                        .build());
    }
}
