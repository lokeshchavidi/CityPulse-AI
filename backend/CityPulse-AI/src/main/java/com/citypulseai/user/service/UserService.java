package com.citypulseai.user.service;

import com.citypulseai.user.dto.ChangePasswordRequest;
import com.citypulseai.user.dto.CitizenDashboardResponse;
import com.citypulseai.user.dto.ProfileResponse;
import com.citypulseai.user.dto.RegisterUserRequest;
import com.citypulseai.user.dto.RegisterUserResponse;
import com.citypulseai.user.dto.UpdateProfileRequest;

public interface UserService {

	RegisterUserResponse registerUser(RegisterUserRequest request);

	CitizenDashboardResponse getCitizenDashboard();
	
	ProfileResponse getProfile();
	
	ProfileResponse updateProfile(UpdateProfileRequest request);
	
	void changePassword(ChangePasswordRequest request);
}
