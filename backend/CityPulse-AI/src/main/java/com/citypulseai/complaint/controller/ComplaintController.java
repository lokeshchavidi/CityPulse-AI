package com.citypulseai.complaint.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.common.response.ApiResponse;
import com.citypulseai.complaint.dto.AssignDepartmentRequest;
import com.citypulseai.complaint.dto.AssignOfficerRequest;
import com.citypulseai.complaint.dto.ComplaintHistoryResponse;
import com.citypulseai.complaint.dto.ComplaintResponse;
import com.citypulseai.complaint.dto.CreateComplaintRequest;
import com.citypulseai.complaint.dto.UpdateComplaintPriorityRequest;
import com.citypulseai.complaint.dto.UpdateComplaintStatusRequest;
import com.citypulseai.complaint.service.ComplaintHistoryService;
import com.citypulseai.complaint.service.ComplaintService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/complaints")
@RequiredArgsConstructor
public class ComplaintController {
	
	private final ComplaintService complaintService;
	private final ComplaintHistoryService complaintHistoryService;
	
	@PreAuthorize("hasRole('CITIZEN')")
	@PostMapping(
			consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse<ComplaintResponse>> createComplaint(
			@Valid @ModelAttribute CreateComplaintRequest request,
			@RequestPart("image") MultipartFile image) {
		
		ComplaintResponse complaintResponse = complaintService.createComplaint(request, image);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(ApiResponse.<ComplaintResponse>builder()
						.success(true)
						.message(AppConstants.COMPLAINT_CREATED_SUCCESSFULLY)
						.data(complaintResponse)
						.build());
	}
	
	@PreAuthorize("hasRole('CITIZEN')")
	@GetMapping("/my")
	public ResponseEntity<ApiResponse<List<ComplaintResponse>>> getMyComplaints() {
		
		List<ComplaintResponse> myComplaints = complaintService.getMyComplaints();
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(ApiResponse.<List<ComplaintResponse>>builder()
						.success(true)
						.message(AppConstants.COMPLAINTS_RETRIEVED_SUCCESSFULLY)
						.data(myComplaints)
						.build());
	}
	
	@PreAuthorize("hasAnyRole('CITIZEN','OFFICER','DEPARTMENT_MANAGER','ADMIN')")
	@GetMapping("/{complaintId}")
	public ResponseEntity<ApiResponse<ComplaintResponse>> getComplaintById(@PathVariable(name = "complaintId") String complaintId) {
		
		ComplaintResponse complaintResponse = complaintService.getComplaintById(complaintId);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(ApiResponse.<ComplaintResponse>builder()
						.success(true)
						.message(AppConstants.COMPLAINT_RETRIEVED_SUCCESSFULLY)
						.data(complaintResponse)
						.build());
	}
	
	// Restricted to ADMIN: Officers see only their assigned complaints
	// (/officer/complaints) and Department Managers see only their
	// department's queue (/department-manager/complaints) — neither role
	// should see every complaint city-wide.
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	public ResponseEntity<ApiResponse<List<ComplaintResponse>>> getAllComplaints() {
		
		List<ComplaintResponse> allComplaints = complaintService.getAllComplaints();
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(ApiResponse.<List<ComplaintResponse>>builder()
						.success(true)
						.message(AppConstants.COMPLAINTS_RETRIEVED_SUCCESSFULLY)
						.data(allComplaints)
						.build());
	}
	
	// Restricted to ADMIN: Department Managers already have their own
	// review/override workflow (DepartmentManagerController) which applies
	// the correct state validation, history, and notifications; this is a
	// manual admin correction tool only.
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{complaintId}/department")
	public ResponseEntity<ApiResponse<ComplaintResponse>> assignDepartment(
			@Valid @RequestBody AssignDepartmentRequest departmentRequest,
			@PathVariable(name = "complaintId") String complaintId) {
		
		ComplaintResponse complaintResponse = complaintService.assignDepartment(
				complaintId, departmentRequest);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(ApiResponse.<ComplaintResponse>builder()
						.success(true)
						.message(AppConstants.COMPLAINT_ASSIGNED_TO_DEPARTMENT_SUCCESSFULLY)
						.data(complaintResponse)
						.build());
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{complaintId}/officer")
	public ResponseEntity<ApiResponse<ComplaintResponse>> assignOfficer(
			@Valid @RequestBody AssignOfficerRequest officerRequest,
			@PathVariable(name = "complaintId") String complaintId) {
		
		ComplaintResponse complaintResponse = complaintService.assignOfficer(complaintId, officerRequest);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(ApiResponse.<ComplaintResponse>builder()
						.success(true)
						.message(AppConstants.COMPLAINT_ASSIGNED_TO_OFFICER_SUCCESSFULLY)
						.data(complaintResponse)
						.build());
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{complaintId}/status")
	public ResponseEntity<ApiResponse<ComplaintResponse>> updateComplaintStatus(
			@Valid @RequestBody UpdateComplaintStatusRequest statusRequest,
			@PathVariable(name = "complaintId") String complaintId) {
		
		ComplaintResponse complaintResponse = complaintService.updateComplaintStatus(complaintId, statusRequest);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(ApiResponse.<ComplaintResponse>builder()
						.success(true)
						.message(AppConstants.COMPLAINT_STATUS_UPDATED_SUCCESSFULLY)
						.data(complaintResponse)
						.build());
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{complaintId}/priority")
	public ResponseEntity<ApiResponse<ComplaintResponse>> updateComplaintPriority(
			@Valid @RequestBody UpdateComplaintPriorityRequest priorityRequest,
			@PathVariable(name = "complaintId") String complaintId) {
		
		ComplaintResponse complaintResponse = complaintService.updateComplaintPriority(complaintId, priorityRequest);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(ApiResponse.<ComplaintResponse>builder()
						.success(true)
						.message(AppConstants.COMPLAINT_PRIORITY_UPDATED_SUCCESSFULLY)
						.data(complaintResponse)
						.build());
	}
	
	@GetMapping("/{complaintId}/history")
	@PreAuthorize("hasAnyRole('CITIZEN','OFFICER','DEPARTMENT_MANAGER','ADMIN')")
	public ResponseEntity<ApiResponse<List<ComplaintHistoryResponse>>>
	        getComplaintHistory(@PathVariable String complaintId) {

	    List<ComplaintHistoryResponse> history =
	            complaintHistoryService.getComplaintHistory(complaintId);

	    return ResponseEntity.ok(
	            ApiResponse.<List<ComplaintHistoryResponse>>builder()
	                    .success(true)
	                    .message("Complaint history retrieved successfully.")
	                    .data(history)
	                    .build());
	}
}
