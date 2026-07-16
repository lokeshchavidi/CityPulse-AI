package com.citypulseai.department.service;

import java.util.List;

import com.citypulseai.department.dto.CreateDepartmentRequest;
import com.citypulseai.department.dto.DepartmentResponse;

public interface DepartmentService {

	List<DepartmentResponse> getAllDepartments();

	DepartmentResponse createDepartment(CreateDepartmentRequest request);
}
