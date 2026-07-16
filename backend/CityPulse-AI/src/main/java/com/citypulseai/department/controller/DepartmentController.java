package com.citypulseai.department.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citypulseai.common.response.ApiResponse;
import com.citypulseai.department.dto.CreateDepartmentRequest;
import com.citypulseai.department.dto.DepartmentResponse;
import com.citypulseai.department.service.DepartmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/departments")
@RequiredArgsConstructor
public class DepartmentController {

	private final DepartmentService departmentService;

	@GetMapping
	@PreAuthorize("hasAnyRole('ADMIN','DEPARTMENT_MANAGER')")
	public ResponseEntity<ApiResponse<List<DepartmentResponse>>> getAllDepartments() {

		List<DepartmentResponse> departments = departmentService.getAllDepartments();

		return ResponseEntity.ok(
				ApiResponse.<List<DepartmentResponse>>builder()
						.success(true)
						.message("Departments retrieved successfully.")
						.data(departments)
						.build());
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<DepartmentResponse>> createDepartment(
			@Valid @RequestBody CreateDepartmentRequest request) {

		DepartmentResponse response = departmentService.createDepartment(request);

		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(ApiResponse.<DepartmentResponse>builder()
						.success(true)
						.message("Department created successfully.")
						.data(response)
						.build());
	}
}
