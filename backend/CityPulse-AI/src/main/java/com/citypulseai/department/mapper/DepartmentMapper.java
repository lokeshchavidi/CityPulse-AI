package com.citypulseai.department.mapper;

import org.springframework.stereotype.Component;

import com.citypulseai.department.dto.DepartmentResponse;
import com.citypulseai.department.entity.Department;

@Component
public class DepartmentMapper {

	public DepartmentResponse toResponse(Department department) {

		return DepartmentResponse.builder()
				.departmentId(department.getDepartmentId())
				.departmentName(department.getDepartmentName())
				.description(department.getDescription())
				.createdAt(department.getCreatedAt())
				.build();
	}
}
