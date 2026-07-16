package com.citypulseai.security;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.citypulseai.common.response.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Ensures every "not authenticated" rejection (missing token, expired token,
 * malformed token, disabled account) returns a clean 401 in the same JSON
 * shape ({@link ErrorResponse}) the rest of the API uses, instead of
 * Spring Security's default empty 401/403 response or Spring Boot's default
 * whitelabel error body. The frontend's axios interceptor specifically
 * checks for status 401 to trigger auto-logout, so this needs to be
 * consistent.
 */
@Component
public class JsonAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper()
            .findAndRegisterModules();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException {

        ErrorResponse errorResponse = ErrorResponse.builder()
                .success(false)
                .message("Authentication required. Please sign in again.")
                .timestamp(LocalDateTime.now())
                .build();

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
