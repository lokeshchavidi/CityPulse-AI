package com.citypulseai.admin.controller;

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

import com.citypulseai.admin.dto.AdminDashboardResponse;
import com.citypulseai.admin.dto.CreateStaffUserRequest;
import com.citypulseai.admin.dto.UpdateUserDepartmentRequest;
import com.citypulseai.admin.dto.UserResponse;
import com.citypulseai.admin.service.AdminService;
import com.citypulseai.common.response.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
	
	private final AdminService adminService;

	@GetMapping("/dashboard")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<AdminDashboardResponse>> getDashboard() {

	    AdminDashboardResponse response =
	            adminService.getDashboard();

	    return ResponseEntity.ok(
	            ApiResponse.<AdminDashboardResponse>builder()
	                    .success(true)
	                    .message("Dashboard retrieved successfully.")
	                    .data(response)
	                    .build());
	}
	
	@GetMapping("/users")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {

	    List<UserResponse> users =
	            adminService.getAllUsers();

	    return ResponseEntity.ok(
	            ApiResponse.<List<UserResponse>>builder()
	                    .success(true)
	                    .message("Users retrieved successfully.")
	                    .data(users)
	                    .build());
	}
	
	@PostMapping("/users")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<UserResponse>> createStaffUser(
	        @Valid @RequestBody CreateStaffUserRequest request) {

	    UserResponse response = adminService.createStaffUser(request);

	    return ResponseEntity
	            .status(HttpStatus.CREATED)
	            .body(ApiResponse.<UserResponse>builder()
	                    .success(true)
	                    .message("Staff account created successfully.")
	                    .data(response)
	                    .build());
	}
	
	@GetMapping("/users/{userId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<UserResponse>> getUserByUserId(
	        @PathVariable String userId) {

	    UserResponse user = adminService.getUserByUserId(userId);

	    return ResponseEntity.ok(
	            ApiResponse.<UserResponse>builder()
	                    .success(true)
	                    .message("User retrieved successfully.")
	                    .data(user)
	                    .build());
	}
	
	@PatchMapping("/users/{userId}/enable")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<UserResponse>> enableUser(
	        @PathVariable String userId) {

	    UserResponse response = adminService.enableUser(userId);

	    return ResponseEntity.ok(
	            ApiResponse.<UserResponse>builder()
	                    .success(true)
	                    .message("User enabled successfully.")
	                    .data(response)
	                    .build());
	}
	
	@PatchMapping("/users/{userId}/disable")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<UserResponse>> disableUser(
	        @PathVariable String userId) {

	    UserResponse response = adminService.disableUser(userId);

	    return ResponseEntity.ok(
	            ApiResponse.<UserResponse>builder()
	                    .success(true)
	                    .message("User disabled successfully.")
	                    .data(response)
	                    .build());
	}
	
	@PatchMapping("/users/{userId}/department")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<UserResponse>> updateUserDepartment(
	        @PathVariable String userId,
	        @Valid @RequestBody UpdateUserDepartmentRequest request) {

	    UserResponse response =
	            adminService.updateUserDepartment(userId, request);

	    return ResponseEntity.ok(
	            ApiResponse.<UserResponse>builder()
	                    .success(true)
	                    .message("User department updated successfully.")
	                    .data(response)
	                    .build());
	}
}
