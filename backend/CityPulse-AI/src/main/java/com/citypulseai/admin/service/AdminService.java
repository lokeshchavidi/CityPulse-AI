package com.citypulseai.admin.service;

import java.util.List;

import com.citypulseai.admin.dto.AdminDashboardResponse;
import com.citypulseai.admin.dto.CreateStaffUserRequest;
import com.citypulseai.admin.dto.UpdateUserDepartmentRequest;
import com.citypulseai.admin.dto.UserResponse;
import com.citypulseai.statistics.dto.ComplaintStatisticsResponse;

public interface AdminService {

	AdminDashboardResponse getDashboard();

	ComplaintStatisticsResponse getStatistics();
	
	List<UserResponse> getAllUsers();
	
	UserResponse getUserByUserId(String userId);
	
	UserResponse createStaffUser(CreateStaffUserRequest request);
	
	UserResponse enableUser(String userId);

	UserResponse disableUser(String userId);
	
	UserResponse updateUserDepartment(
	        String userId,
	        UpdateUserDepartmentRequest request);
}
