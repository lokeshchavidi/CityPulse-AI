package com.citypulseai.department.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.citypulseai.department.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long>{

	Optional<Department> findByDepartmentName(String departmentName);
	
	Optional<Department> findByDepartmentNameIgnoreCase(String departmentName);
	
	boolean existsByDepartmentName(String departmentName);
}
