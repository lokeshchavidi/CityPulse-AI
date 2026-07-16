package com.citypulseai.department.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateDepartmentRequest {

	@NotBlank(message = "Department name is required.")
	@Size(max = 100, message = "Department name cannot exceed 100 characters.")
	private String departmentName;

	@NotBlank(message = "Description is required.")
	@Size(max = 500, message = "Description cannot exceed 500 characters.")
	private String description;
}
