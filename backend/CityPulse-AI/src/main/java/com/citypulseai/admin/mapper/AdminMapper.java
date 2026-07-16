package com.citypulseai.admin.mapper;

import org.springframework.stereotype.Component;

import com.citypulseai.admin.dto.UserResponse;
import com.citypulseai.user.entity.User;

@Component
public class AdminMapper {

	public UserResponse toUserResponse(User user) {

	    return UserResponse.builder()
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
