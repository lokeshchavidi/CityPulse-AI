package com.citypulseai.user.service;

import com.citypulseai.user.dto.ChangePasswordRequest;
import com.citypulseai.user.dto.CitizenDashboardResponse;
import com.citypulseai.user.dto.ProfileResponse;
import com.citypulseai.user.dto.RegisterUserRequest;
import com.citypulseai.user.dto.RegisterUserResponse;
import com.citypulseai.user.dto.UpdateProfileRequest;
import com.citypulseai.statistics.dto.ComplaintStatisticsResponse;

public interface UserService {

	RegisterUserResponse registerUser(RegisterUserRequest request);

	CitizenDashboardResponse getCitizenDashboard();

	ComplaintStatisticsResponse getStatistics();
	
	ProfileResponse getProfile();
	
	ProfileResponse updateProfile(UpdateProfileRequest request);
	
	void changePassword(ChangePasswordRequest request);
}
