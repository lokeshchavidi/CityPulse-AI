package com.citypulseai.authentication.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.citypulseai.authentication.dto.LoginRequest;
import com.citypulseai.authentication.dto.LoginResponse;
import com.citypulseai.authentication.exception.PortalAccessDeniedException;
import com.citypulseai.authentication.service.AuthenticationService;
import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.role.enums.RoleType;
import com.citypulseai.security.CustomUserDetails;
import com.citypulseai.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService{

	private final AuthenticationManager authenticationManager;	
	private final JwtService jwtService;
	
	@Override
	public LoginResponse loginAsCitizen(LoginRequest request) {

		CustomUserDetails userDetails = authenticate(request);

		if (userDetails.getUser().getRole().getRoleType() != RoleType.CITIZEN) {
			throw new PortalAccessDeniedException(AppConstants.CITIZEN_PORTAL_ONLY);
		}

		return buildLoginResponse(userDetails);
	}

	@Override
	public LoginResponse loginAsStaff(LoginRequest request) {

		CustomUserDetails userDetails = authenticate(request);

		if (userDetails.getUser().getRole().getRoleType() == RoleType.CITIZEN) {
			throw new PortalAccessDeniedException(AppConstants.STAFF_PORTAL_ONLY);
		}

		return buildLoginResponse(userDetails);
	}

	/**
	 * Runs Spring Security authentication (validates email/password against
	 * the DB and checks the account is enabled) and returns the
	 * authenticated principal. Portal-specific role checks happen after
	 * this, in the calling method, so a wrong-portal attempt still counts
	 * as a successful authentication rather than a generic credentials
	 * failure.
	 */
	private CustomUserDetails authenticate(LoginRequest request) {

		Authentication authentication = authenticationManager.authenticate(
		        new UsernamePasswordAuthenticationToken(
		                request.getEmail(),
		                request.getPassword()));

		return (CustomUserDetails) authentication.getPrincipal();
	}

	private LoginResponse buildLoginResponse(UserDetails userDetails) {

		String token = jwtService.generateToken(userDetails);

		return LoginResponse.builder()
		        .accessToken(token)
		        .tokenType("Bearer")
		        .build();
	}

}
