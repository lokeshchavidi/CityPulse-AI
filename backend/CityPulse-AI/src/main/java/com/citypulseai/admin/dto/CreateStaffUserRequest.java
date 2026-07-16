package com.citypulseai.admin.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.citypulseai.role.enums.RoleType;

/**
 * Used by an Admin to create Officer, Department Manager, and Admin
 * accounts. Citizens can never be created through this endpoint — they
 * self-register through /api/v1/users/register.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateStaffUserRequest {

	@NotBlank(message = "First name is required")
	@Size(max = 50, message = "First name cannot exceed 50 characters")
	private String firstName;

	@NotBlank(message = "Last name is required")
	@Size(max = 50, message = "Last name cannot exceed 50 characters")
	private String lastName;

	@NotBlank(message = "Email is required")
	@Email(message = "Please provide a valid email address")
	@Size(max = 100, message = "Email cannot exceed 100 characters")
	private String email;

	@NotBlank(message = "Password is required")
	@Pattern(
			regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,20}$",
			message = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be 8-20 characters long"
	)
	private String password;

	@NotBlank(message = "Phone number is required")
	@Pattern(
			regexp = "^[6-9]\\d{9}$",
			message = "Phone number must be a valid 10-digit Indian mobile number"
	)
	private String phoneNumber;

	@NotNull(message = "Role is required")
	private RoleType role;

	/**
	 * Required for OFFICER and DEPARTMENT_MANAGER, ignored for ADMIN.
	 * Validated in the service layer since the rule depends on the role.
	 */
	private Long departmentId;
}
