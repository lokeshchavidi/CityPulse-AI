package com.citypulseai.authentication.service;

import com.citypulseai.authentication.dto.LoginRequest;
import com.citypulseai.authentication.dto.LoginResponse;

public interface AuthenticationService {

	/**
	 * Citizen-only login. Rejects any staff account (Officer, Department
	 * Manager, Admin) with a clear "wrong portal" error.
	 */
	LoginResponse loginAsCitizen(LoginRequest request);

	/**
	 * Staff-only login (Officer, Department Manager, Admin). Rejects
	 * citizen accounts with a clear "wrong portal" error.
	 */
	LoginResponse loginAsStaff(LoginRequest request);
}
