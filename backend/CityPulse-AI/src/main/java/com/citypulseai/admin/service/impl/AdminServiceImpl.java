package com.citypulseai.admin.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citypulseai.admin.dto.AdminDashboardResponse;
import com.citypulseai.admin.dto.CreateStaffUserRequest;
import com.citypulseai.admin.dto.UpdateUserDepartmentRequest;
import com.citypulseai.admin.dto.UserResponse;
import com.citypulseai.admin.exception.InvalidUserOperationException;
import com.citypulseai.admin.mapper.AdminMapper;
import com.citypulseai.admin.service.AdminService;
import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.common.service.CurrentUserService;
import com.citypulseai.complaint.entity.ComplaintStatus;
import com.citypulseai.complaint.enums.ComplaintPriority;
import com.citypulseai.complaint.repository.ComplaintRepository;
import com.citypulseai.department.entity.Department;
import com.citypulseai.department.exception.DepartmentNotFoundException;
import com.citypulseai.department.repository.DepartmentRepository;
import com.citypulseai.notification.dto.NotificationMessages;
import com.citypulseai.notification.entity.NotificationType;
import com.citypulseai.notification.service.NotificationService;
import com.citypulseai.role.entity.Role;
import com.citypulseai.role.enums.RoleType;
import com.citypulseai.role.exception.RoleNotFoundException;
import com.citypulseai.role.repository.RoleRepository;
import com.citypulseai.user.entity.User;
import com.citypulseai.user.exception.DepartmentManagerAlreadyExistsException;
import com.citypulseai.user.exception.EmailAlreadyExistsException;
import com.citypulseai.user.exception.UserNotFoundException;
import com.citypulseai.user.repository.UserRepository;
import com.citypulseai.user.util.UserIdGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

	private final ComplaintRepository complaintRepository;
	private final UserRepository userRepository;
	private final DepartmentRepository departmentRepository;
	private final AdminMapper adminMapper;
	private final CurrentUserService currentUserService;
	private final NotificationService notificationService;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	private final UserIdGenerator userIdGenerator;
	
	@Override
	@Transactional(readOnly = true)
	public AdminDashboardResponse getDashboard() {

	    return AdminDashboardResponse.builder()
	            .totalComplaints(complaintRepository.count())
	            .openComplaints(complaintRepository.countByStatus(ComplaintStatus.OPEN))
	            .underReviewComplaints(complaintRepository.countByStatus(ComplaintStatus.UNDER_REVIEW))
	            .assignedComplaints(complaintRepository.countByStatus(ComplaintStatus.ASSIGNED))
	            .inProgressComplaints(complaintRepository.countByStatus(ComplaintStatus.IN_PROGRESS))
	            .resolvedComplaints(complaintRepository.countByStatus(ComplaintStatus.RESOLVED))
	            .criticalComplaints(complaintRepository.countByPriority(ComplaintPriority.CRITICAL))
	            .totalCitizens(userRepository.countByRole_RoleType(RoleType.CITIZEN))
	            .totalOfficers(userRepository.countByRole_RoleType(RoleType.OFFICER))
	            .totalDepartmentManagers(userRepository.countByRole_RoleType(RoleType.DEPARTMENT_MANAGER))
	            .totalDepartments(departmentRepository.count())
	            .build();
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<UserResponse> getAllUsers() {

	    return userRepository.findAll()
	            .stream()
	            .map(adminMapper::toUserResponse)
	            .toList();
	}
	
	@Override
	@Transactional(readOnly = true)
	public UserResponse getUserByUserId(String userId) {

	    User user = userRepository.findByUserId(userId)
	            .orElseThrow(() -> new UserNotFoundException(
	                    "User not found with ID: " + userId));

	    return adminMapper.toUserResponse(user);
	}
	
	@Override
	@Transactional
	public UserResponse createStaffUser(CreateStaffUserRequest request) {
 
	    if (request.getRole() == RoleType.CITIZEN) {
	        throw new InvalidUserOperationException(
	                "Citizens cannot be created through staff creation. They must self-register.");
	    }
 
	    if (userRepository.existsByEmail(request.getEmail())) {
	        throw new EmailAlreadyExistsException(AppConstants.EMAIL_ALREADY_EXISTS);
	    }
 
	    Department department = null;
 
	    if (request.getRole() == RoleType.OFFICER
	            || request.getRole() == RoleType.DEPARTMENT_MANAGER) {
 
	        if (request.getDepartmentId() == null) {
	            throw new InvalidUserOperationException(
	                    "Department is required for this role.");
	        }
 
	        department = departmentRepository.findById(request.getDepartmentId())
	                .orElseThrow(() -> new DepartmentNotFoundException(
	                        AppConstants.DEPARTMENT_NOT_FOUND));
	        
	        if (request.getRole() == RoleType.DEPARTMENT_MANAGER
	                && userRepository.existsByRole_RoleTypeAndDepartment(
	                        RoleType.DEPARTMENT_MANAGER,
	                        department)) {
 
	            throw new DepartmentManagerAlreadyExistsException(
	                    "This department already has a Department Manager.");
	        }
	    }
 
	    Role role = roleRepository.findByRoleType(request.getRole())
	            .orElseThrow(() -> new RoleNotFoundException(AppConstants.ROLE_NOT_FOUND));
 
	    User staffUser = User.builder()
	            .userId(userIdGenerator.generateUserId())
	            .firstName(request.getFirstName())
	            .lastName(request.getLastName())
	            .email(request.getEmail())
	            .password(passwordEncoder.encode(request.getPassword()))
	            .phoneNumber(request.getPhoneNumber())
	            .enabled(true)
	            .role(role)
	            .department(department)
	            .build();
 
	    User savedUser = userRepository.save(staffUser);
 
	    notificationService.createNotification(
	            savedUser,
	            null,
	            NotificationType.GENERAL,
	            "Welcome to CityPulse AI",
	            "Your " + role.getRoleType().name().replace("_", " ")
	                    + " account has been created by the administrator.");
 
	    return adminMapper.toUserResponse(savedUser);
	}
	
	@Override
	@Transactional
	public UserResponse enableUser(String userId) {
	    return updateUserStatus(userId, true);
	}

	@Override
	@Transactional
	public UserResponse disableUser(String userId) {
	    return updateUserStatus(userId, false);
	}
	
	@Override
	@Transactional
	public UserResponse updateUserDepartment(
	        String userId,
	        UpdateUserDepartmentRequest request) {
 
	    User user = userRepository.findByUserId(userId)
	            .orElseThrow(() -> new UserNotFoundException(
	                    "User not found with ID: " + userId));
 
	    validateDepartmentTransfer(user);
 
	    Department department = departmentRepository
	            .findById(request.getDepartmentId())
	            .orElseThrow(() -> new DepartmentNotFoundException(
	                    "Department not found with ID: " + request.getDepartmentId()));
 
	    if (user.getDepartment() != null
	            && user.getDepartment().getDepartmentId()
	                    .equals(department.getDepartmentId())) {
 
	        throw new InvalidUserOperationException(
	                "User is already assigned to this department.");
	    }
 
	    Department previousDepartment = user.getDepartment();
	    
	    if (user.getRole().getRoleType() == RoleType.DEPARTMENT_MANAGER
	            && userRepository.existsByRole_RoleTypeAndDepartment(
	                    RoleType.DEPARTMENT_MANAGER,
	                    department)) {
 
	        throw new DepartmentManagerAlreadyExistsException(
	        		"This department already has a Department Manager.");
	    }
 
	    user.setDepartment(department);
 
	    User updatedUser = userRepository.save(user);
 
	    notificationService.createNotification(
	            updatedUser,
	            null,
	            NotificationType.GENERAL,
	            NotificationMessages.DEPARTMENT_UPDATED_TITLE,
	            "Your department has been changed from "
	                    + (previousDepartment != null
	                            ? previousDepartment.getDepartmentName()
	                            : "None")
	                    + " to "
	                    + department.getDepartmentName()
	                    + ".");
 
	    return adminMapper.toUserResponse(updatedUser);
	}
	
	private void validateDepartmentTransfer(User user) {

	    RoleType roleType = user.getRole().getRoleType();

	    if (roleType != RoleType.OFFICER
	            && roleType != RoleType.DEPARTMENT_MANAGER) {

	        throw new InvalidUserOperationException(
	                "Only Officers and Department Managers can be assigned to a department.");
	    }
	}
	
	private UserResponse updateUserStatus(String userId, boolean enabled) {

	    User currentAdmin = currentUserService.getCurrentUser();

	    User user = userRepository.findByUserId(userId)
	            .orElseThrow(() -> new UserNotFoundException(
	                    "User not found with ID: " + userId));

	    // Cannot update your own account
	    if (currentAdmin.getUserId().equals(user.getUserId())) {
	        throw new InvalidUserOperationException(
	                "You cannot update your own account status.");
	    }

	    // Prevent disabling the last active admin
	    if (!enabled
	            && user.getRole().getRoleType() == RoleType.ADMIN
	            && userRepository.countByRole_RoleTypeAndEnabled(
	                    RoleType.ADMIN, true) == 1) {

	        throw new InvalidUserOperationException(
	                "The last active administrator cannot be disabled.");
	    }

	    // Already in requested state
	    if (user.isEnabled() == enabled) {

	        throw new InvalidUserOperationException(
	                enabled
	                        ? "User is already enabled."
	                        : "User is already disabled.");
	    }

	    user.setEnabled(enabled);

	    User updatedUser = userRepository.save(user);

	    notificationService.createNotification(
	            updatedUser,
	            null,
	            NotificationType.GENERAL,
	            enabled
	                    ? NotificationMessages.ACCOUNT_ENABLED_TITLE
	                    : NotificationMessages.ACCOUNT_DISABLED_TITLE,
	            enabled
	                    ? "Your account has been enabled by the administrator."
	                    : "Your account has been disabled by the administrator.");

	    return adminMapper.toUserResponse(updatedUser);
	}

}
