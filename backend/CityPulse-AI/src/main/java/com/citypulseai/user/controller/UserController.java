package com.citypulseai.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.common.response.ApiResponse;
import com.citypulseai.user.dto.ChangePasswordRequest;
import com.citypulseai.user.dto.CitizenDashboardResponse;
import com.citypulseai.user.dto.ProfileResponse;
import com.citypulseai.user.dto.RegisterUserRequest;
import com.citypulseai.user.dto.RegisterUserResponse;
import com.citypulseai.user.dto.UpdateProfileRequest;
import com.citypulseai.user.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;

	@PostMapping("/register")
	public ResponseEntity<ApiResponse<RegisterUserResponse>> registerUser(@Valid @RequestBody RegisterUserRequest request) {
		
		RegisterUserResponse response = userService.registerUser(request);
		
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(ApiResponse.<RegisterUserResponse>builder()
						.success(true)
						.message(AppConstants.USER_REGISTRATION_SUCCESSFUL)
						.data(response)
						.build());
		
	}
	
	@GetMapping("/dashboard")
	@PreAuthorize("hasRole('CITIZEN')")
	public ResponseEntity<ApiResponse<CitizenDashboardResponse>> getCitizenDashboard() {

	    CitizenDashboardResponse response = userService.getCitizenDashboard();

	    return ResponseEntity.ok(
	            ApiResponse.<CitizenDashboardResponse>builder()
	                    .success(true)
	                    .message("Citizen dashboard retrieved successfully.")
	                    .data(response)
	                    .build());
	}
	
	@GetMapping("/profile")
	public ResponseEntity<ApiResponse<ProfileResponse>> getProfile() {

	    ProfileResponse profile =
	            userService.getProfile();

	    return ResponseEntity.ok(
	            ApiResponse.<ProfileResponse>builder()
	                    .success(true)
	                    .message("Profile retrieved successfully.")
	                    .data(profile)
	                    .build());
	}
	
	@PutMapping("/profile")
	public ResponseEntity<ApiResponse<ProfileResponse>> updateProfile(
	        @Valid @RequestBody UpdateProfileRequest request) {

	    ProfileResponse profile =
	            userService.updateProfile(request);

	    return ResponseEntity.ok(
	            ApiResponse.<ProfileResponse>builder()
	                    .success(true)
	                    .message("Profile updated successfully.")
	                    .data(profile)
	                    .build());
	}
	
	@PutMapping("/change-password")
	public ResponseEntity<ApiResponse<Void>> changePassword(
	        @Valid @RequestBody ChangePasswordRequest request) {

	    userService.changePassword(request);

	    return ResponseEntity.ok(
	            ApiResponse.<Void>builder()
	                    .success(true)
	                    .message("Password changed successfully.")
	                    .build());
	}
}
