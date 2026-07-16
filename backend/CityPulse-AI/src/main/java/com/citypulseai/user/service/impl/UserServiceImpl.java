package com.citypulseai.user.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.common.service.CurrentUserService;
import com.citypulseai.complaint.entity.ComplaintStatus;
import com.citypulseai.complaint.repository.ComplaintRepository;
import com.citypulseai.role.entity.Role;
import com.citypulseai.role.enums.RoleType;
import com.citypulseai.role.exception.RoleNotFoundException;
import com.citypulseai.role.repository.RoleRepository;
import com.citypulseai.user.dto.ChangePasswordRequest;
import com.citypulseai.user.dto.CitizenDashboardResponse;
import com.citypulseai.user.dto.ProfileResponse;
import com.citypulseai.user.dto.RegisterUserRequest;
import com.citypulseai.user.dto.RegisterUserResponse;
import com.citypulseai.user.dto.UpdateProfileRequest;
import com.citypulseai.user.entity.User;
import com.citypulseai.user.exception.EmailAlreadyExistsException;
import com.citypulseai.user.exception.InvalidPasswordException;
import com.citypulseai.user.mapper.UserMapper;
import com.citypulseai.user.repository.UserRepository;
import com.citypulseai.user.service.UserService;
import com.citypulseai.user.util.UserIdGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService{

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	private final UserIdGenerator userIdGenerator;
	private final UserMapper userMapper;
	private final ComplaintRepository complaintRepository;
	private final CurrentUserService currentUserService;

	@Override
	public RegisterUserResponse registerUser(RegisterUserRequest request) {

		if(userRepository.existsByEmail(request.getEmail())) {
			throw new EmailAlreadyExistsException(AppConstants.EMAIL_ALREADY_EXISTS);
		}
		
		String userId = userIdGenerator.generateUserId();
		String encodedPassword = passwordEncoder.encode(request.getPassword());
		Role citizenRole = roleRepository.findByRoleType(RoleType.CITIZEN)
			.orElseThrow(() -> new RoleNotFoundException(AppConstants.ROLE_NOT_FOUND));
		
		User user = userMapper.toEntity(request, userId, encodedPassword, citizenRole, null);
		
		User savedUser = userRepository.save(user);
		
		return userMapper.toResponse(savedUser);
	}

	@Override
	@Transactional(readOnly = true)
	public CitizenDashboardResponse getCitizenDashboard() {

	    User citizen = currentUserService.getCurrentUser();

	    return CitizenDashboardResponse.builder()
	            .totalComplaints(
	                    complaintRepository.countByCitizen(citizen))
	            .openComplaints(
	                    complaintRepository.countByCitizenAndStatus(
	                            citizen,
	                            ComplaintStatus.OPEN))
	            .underReviewComplaints(
	                    complaintRepository.countByCitizenAndStatus(
	                            citizen,
	                            ComplaintStatus.UNDER_REVIEW))
	            .assignedComplaints(
	                    complaintRepository.countByCitizenAndStatus(
	                            citizen,
	                            ComplaintStatus.ASSIGNED))
	            .inProgressComplaints(
	                    complaintRepository.countByCitizenAndStatus(
	                            citizen,
	                            ComplaintStatus.IN_PROGRESS))
	            .resolvedComplaints(
	                    complaintRepository.countByCitizenAndStatus(
	                            citizen,
	                            ComplaintStatus.RESOLVED))
	            .build();
	}
	
	@Override
	@Transactional(readOnly = true)
	public ProfileResponse getProfile() {

	    User currentUser = currentUserService.getCurrentUser();

	    return userMapper.toProfileResponse(currentUser);
	}
	
	@Override
	@Transactional
	public ProfileResponse updateProfile(
	        UpdateProfileRequest request) {

	    User currentUser = currentUserService.getCurrentUser();

	    currentUser.setFirstName(request.getFirstName());
	    currentUser.setLastName(request.getLastName());
	    currentUser.setPhoneNumber(request.getPhoneNumber());

	    User updatedUser = userRepository.save(currentUser);

	    return userMapper.toProfileResponse(updatedUser);
	}
	
	@Override
	@Transactional
	public void changePassword(ChangePasswordRequest request) {

	    User currentUser = currentUserService.getCurrentUser();

	    if (!passwordEncoder.matches(
	            request.getCurrentPassword(),
	            currentUser.getPassword())) {

	        throw new InvalidPasswordException(
	                "Current password is incorrect.");
	    }

	    if (!request.getNewPassword()
	            .equals(request.getConfirmPassword())) {

	        throw new InvalidPasswordException(
	                "New password and confirm password do not match.");
	    }

	    if (passwordEncoder.matches(
	            request.getNewPassword(),
	            currentUser.getPassword())) {

	        throw new InvalidPasswordException(
	                "New password must be different from the current password.");
	    }

	    currentUser.setPassword(
	            passwordEncoder.encode(request.getNewPassword()));

	    userRepository.save(currentUser);
	}
}
