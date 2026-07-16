package com.citypulseai.security;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	private final CustomUserDetailsService customUserDetailsService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		final String jwt = authHeader.substring(7);

		try {

			final String username = jwtService.extractUsername(jwt);

			if (username != null
	                && SecurityContextHolder.getContext().getAuthentication() == null) {

	            UserDetails userDetails =
	                    customUserDetailsService.loadUserByUsername(username);

	            // Reject tokens for accounts that have since been disabled, and
	            // tokens that fail signature/expiry validation. Without this
	            // check, a user disabled by an Admin keeps full API access
	            // until their existing token naturally expires.
	            if (jwtService.isTokenValid(jwt, userDetails) && userDetails.isEnabled()) {

	                UsernamePasswordAuthenticationToken authenticationToken =
	                        new UsernamePasswordAuthenticationToken(
	                                userDetails,
	                                null,
	                                userDetails.getAuthorities());

	             // Build and attach additional request information (such as the client's IP address
	             // and session ID) to the Authentication object. This can be useful for logging,
	             // auditing, and other security-related features.
	                authenticationToken.setDetails(
	                        new WebAuthenticationDetailsSource().buildDetails(request));

	                SecurityContextHolder.getContext()
	                        .setAuthentication(authenticationToken);
	            }
	        }

		} catch (JwtException | UsernameNotFoundException | IllegalArgumentException ex) {

			// Malformed, expired, or invalid-signature tokens (or a token for a
			// user that no longer exists) must NOT crash the filter chain.
			// GlobalExceptionHandler (a @RestControllerAdvice) cannot catch
			// exceptions thrown from a servlet filter, since filters run before
			// the DispatcherServlet — an uncaught throw here previously fell
			// through to Spring Boot's default error page as a raw 500,
			// instead of the clean 401 the frontend expects for session expiry.
			log.debug("Rejecting request with invalid JWT: {}", ex.getMessage());

			SecurityContextHolder.clearContext();
		}

        filterChain.doFilter(request, response);
	}

}
