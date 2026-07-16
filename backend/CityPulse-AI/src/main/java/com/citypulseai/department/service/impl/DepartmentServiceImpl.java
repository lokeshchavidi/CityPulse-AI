package com.citypulseai.department.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citypulseai.department.dto.CreateDepartmentRequest;
import com.citypulseai.department.dto.DepartmentResponse;
import com.citypulseai.department.entity.Department;
import com.citypulseai.department.exception.DepartmentAlreadyExistsException;
import com.citypulseai.department.mapper.DepartmentMapper;
import com.citypulseai.department.repository.DepartmentRepository;
import com.citypulseai.department.service.DepartmentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

	private final DepartmentRepository departmentRepository;
	private final DepartmentMapper departmentMapper;

	@Override
	@Transactional(readOnly = true)
	public List<DepartmentResponse> getAllDepartments() {

		return departmentRepository.findAll()
				.stream()
				.map(departmentMapper::toResponse)
				.toList();
	}

	@Override
	@Transactional
	public DepartmentResponse createDepartment(CreateDepartmentRequest request) {

		if (departmentRepository.existsByDepartmentName(request.getDepartmentName())) {
			throw new DepartmentAlreadyExistsException(
					"A department with this name already exists.");
		}

		Department department = Department.builder()
				.departmentName(request.getDepartmentName())
				.description(request.getDescription())
				.build();

		Department savedDepartment = departmentRepository.save(department);

		return departmentMapper.toResponse(savedDepartment);
	}
}
