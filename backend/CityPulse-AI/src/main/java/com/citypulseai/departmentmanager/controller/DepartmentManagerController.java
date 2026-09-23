package com.citypulseai.departmentmanager.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
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
import com.citypulseai.departmentmanager.dto.AssignOfficerRequest;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintDetailsResponse;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintResponse;
import com.citypulseai.departmentmanager.dto.DepartmentDashboardResponse;
import com.citypulseai.departmentmanager.dto.OfficerResponse;
import com.citypulseai.departmentmanager.dto.OverrideAIRecommendationRequest;
import com.citypulseai.departmentmanager.service.DepartmentManagerService;
import com.citypulseai.statistics.dto.ComplaintStatisticsResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/department-manager")
@RequiredArgsConstructor
public class DepartmentManagerController {

	private final DepartmentManagerService departmentManagerService;
	
	@GetMapping("/complaints")
	@PreAuthorize("hasRole('DEPARTMENT_MANAGER')")
	public ResponseEntity<ApiResponse<List<DepartmentComplaintResponse>>> getComplaintQueue() {
		
		List<DepartmentComplaintResponse> complaints = departmentManagerService.getComplaintQueue();
	
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(
						ApiResponse.<List<DepartmentComplaintResponse>>builder()
						.success(true)
						.message(AppConstants.COMPLAINT_QUEUE_RETRIEVED_SUCCESSFULLY)
						.data(complaints)
						.build());
	}
	
	@GetMapping("/complaints/{complaintId}")
	@PreAuthorize("hasRole('DEPARTMENT_MANAGER')")
	public ResponseEntity<ApiResponse<DepartmentComplaintDetailsResponse>>
	        getComplaintDetails(@PathVariable String complaintId) {

	    DepartmentComplaintDetailsResponse response =
	            departmentManagerService.getComplaintDetails(complaintId);

	    return ResponseEntity
	    		.status(HttpStatus.OK)
	    		.body(
	    				ApiResponse.<DepartmentComplaintDetailsResponse>builder()
	                    .success(true)
	                    .message(AppConstants.COMPLAINT_DETAILS_RETRIEVED_SUCCESSFULLY)
	                    .data(response)
	                    .build());
	}
	
	@PostMapping("/complaints/{complaintId}/accept-ai")
	@PreAuthorize("hasRole('DEPARTMENT_MANAGER')")
	public ResponseEntity<ApiResponse<ComplaintResponse>> acceptAIRecommendation(
	        @PathVariable String complaintId) {

	    ComplaintResponse complaint =
	            departmentManagerService.acceptAIRecommendation(complaintId);

	    return ResponseEntity
	    		.status(HttpStatus.OK)
	    		.body(
	    				ApiResponse.<ComplaintResponse>builder()
	                    .success(true)
	                    .message(AppConstants.AI_RECOMMENDATION_ACCEPTED_SUCCESSFULLY)
	                    .data(complaint)
	                    .build());
	}
	
	@GetMapping("/officers")
	@PreAuthorize("hasRole('DEPARTMENT_MANAGER')")
	public ResponseEntity<ApiResponse<List<OfficerResponse>>> getAvailableOfficers() {

	    List<OfficerResponse> officers =
	            departmentManagerService.getAvailableOfficers();

	    return ResponseEntity
	    		.status(HttpStatus.OK)
	    		.body(
	    				ApiResponse.<List<OfficerResponse>>builder()
	                    .success(true)
	                    .message(AppConstants.AVAILABLE_OFFICERS_RETRIEVED_SUCCESSFULLY)
	                    .data(officers)
	                    .build());
	}
	
	@PostMapping("/complaints/{complaintId}/assign-officer")
	@PreAuthorize("hasRole('DEPARTMENT_MANAGER')")
	public ResponseEntity<ApiResponse<ComplaintResponse>> assignOfficer(
	        @PathVariable String complaintId,
	        @Valid @RequestBody AssignOfficerRequest request) {

	    ComplaintResponse complaint =
	            departmentManagerService.assignOfficer(
	                    complaintId,
	                    request);

	    ApiResponse<ComplaintResponse> response =
	            ApiResponse.<ComplaintResponse>builder()
	                    .success(true)
	                    .message(AppConstants.COMPLAINT_ASSIGNED_TO_OFFICER_SUCCESSFULLY)
	                    .data(complaint)
	                    .build();

	    return ResponseEntity.ok(response);
	}
	
	@GetMapping("/dashboard")
	@PreAuthorize("hasRole('DEPARTMENT_MANAGER')")
	public ResponseEntity<ApiResponse<DepartmentDashboardResponse>> getDashboard() {

	    DepartmentDashboardResponse response =
	            departmentManagerService.getDashboard();

	    return ResponseEntity.ok(
	            ApiResponse.<DepartmentDashboardResponse>builder()
	                    .success(true)
	                    .message("Department dashboard retrieved successfully.")
	                    .data(response)
	                    .build());
	}

	@GetMapping("/statistics")
	@PreAuthorize("hasRole('DEPARTMENT_MANAGER')")
	public ResponseEntity<ApiResponse<ComplaintStatisticsResponse>> getStatistics() {

	    ComplaintStatisticsResponse response =
	            departmentManagerService.getStatistics();

	    return ResponseEntity.ok(
	            ApiResponse.<ComplaintStatisticsResponse>builder()
	                    .success(true)
	                    .message("Statistics retrieved successfully.")
	                    .data(response)
	                    .build());
	}
	
	@PatchMapping("/{complaintId}/override")
	@PreAuthorize("hasRole('DEPARTMENT_MANAGER')")
	public ResponseEntity<ApiResponse<ComplaintResponse>> overrideAIRecommendation(
	        @PathVariable String complaintId,
	        @Valid @RequestBody OverrideAIRecommendationRequest request) {

	    ComplaintResponse response =
	            departmentManagerService.overrideAIRecommendation(
	                    complaintId,
	                    request);

	    return ResponseEntity.ok(
	            ApiResponse.<ComplaintResponse>builder()
	                    .success(true)
	                    .message(AppConstants.AI_RECOMMENDATION_OVERRIDED)
	                    .data(response)
	                    .build());
	}
	
	@GetMapping("/complaints/active")
	@PreAuthorize("hasRole('DEPARTMENT_MANAGER')")
	public ResponseEntity<ApiResponse<List<DepartmentComplaintResponse>>> getActiveComplaints() {

	    return ResponseEntity.ok(
	    		ApiResponse.<List<DepartmentComplaintResponse>>builder()
	    		.success(true)
	    		.message(AppConstants.ACTIVE_COMPLAINTS_RETRIEVED)
	    		.data(departmentManagerService.getActiveComplaints())
	    		.build());
	}
	
	@GetMapping("/complaints/resolved")
	@PreAuthorize("hasRole('DEPARTMENT_MANAGER')")
	public ResponseEntity<ApiResponse<List<DepartmentComplaintResponse>>> getResolvedComplaints() {

	    return ResponseEntity.ok(
	            ApiResponse.<List<DepartmentComplaintResponse>>builder()
	            .success(true)
	            .message(AppConstants.RESOLVED_COMPLAINTS_RETRIEVED)
	            .data(departmentManagerService.getResolvedComplaints())
	            .build());
	}
	
	
}
