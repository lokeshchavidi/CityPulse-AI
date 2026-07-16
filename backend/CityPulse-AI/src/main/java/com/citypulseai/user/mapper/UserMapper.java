package com.citypulseai.user.mapper;

import org.springframework.stereotype.Component;

import com.citypulseai.department.entity.Department;
import com.citypulseai.role.entity.Role;
import com.citypulseai.user.dto.ProfileResponse;
import com.citypulseai.user.dto.RegisterUserRequest;
import com.citypulseai.user.dto.RegisterUserResponse;
import com.citypulseai.user.entity.User;

@Component
public class UserMapper {

	public User toEntity(
			RegisterUserRequest request,
			String userId,
			String encodedPassword,
			Role role,
			Department department) {
		
		return User.builder()
				.userId(userId)
				.firstName(request.getFirstName())
				.lastName(request.getLastName())
				.email(request.getEmail())
				.password(encodedPassword)
				.phoneNumber(request.getPhoneNumber())
				.role(role)
				.department(department)
				.build();
	}
	
	public RegisterUserResponse toResponse(User user) {
		
		return RegisterUserResponse.builder()
				.userId(user.getUserId())
				.firstName(user.getFirstName())
				.lastName(user.getLastName())
				.email(user.getEmail())
				.phoneNumber(user.getPhoneNumber())
				.role(user.getRole().getRoleType().name())
				.department(
						user.getDepartment() != null
						? user.getDepartment().getDepartmentName()
						: null)
				.enabled(user.isEnabled())
				.build();
	}
	
	public ProfileResponse toProfileResponse(User user) {

	    return ProfileResponse.builder()
	            .userId(user.getUserId())
	            .firstName(user.getFirstName())
	            .lastName(user.getLastName())
	            .email(user.getEmail())
	            .phoneNumber(user.getPhoneNumber())
	            .role(user.getRole().getRoleType().name())
	            .department(
	                    user.getDepartment() != null
	                            ? user.getDepartment().getDepartmentName()
	                            : null)
	            .enabled(user.isEnabled())
	            .createdAt(user.getCreatedAt())
	            .build();
	}
}
