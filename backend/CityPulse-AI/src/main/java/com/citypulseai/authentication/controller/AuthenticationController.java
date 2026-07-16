package com.citypulseai.authentication.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.citypulseai.authentication.dto.LoginRequest;
import com.citypulseai.authentication.dto.LoginResponse;
import com.citypulseai.authentication.service.AuthenticationService;
import com.citypulseai.common.response.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    /**
     * Citizen-only login. Officer/Department Manager/Admin accounts are
     * rejected here with a clear "wrong portal" message.
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authenticationService.loginAsCitizen(request);

        return ResponseEntity.ok(
                ApiResponse.<LoginResponse>builder()
                        .success(true)
                        .message("Login successful")
                        .data(response)
                        .build()
        );
    }

    /**
     * Staff-only login (Officer, Department Manager, Admin). Citizen
     * accounts are rejected here with a clear "wrong portal" message.
     */
    @PostMapping("/staff/login")
    public ResponseEntity<ApiResponse<LoginResponse>> staffLogin(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authenticationService.loginAsStaff(request);

        return ResponseEntity.ok(
                ApiResponse.<LoginResponse>builder()
                        .success(true)
                        .message("Login successful")
                        .data(response)
                        .build()
        );
    }
}
