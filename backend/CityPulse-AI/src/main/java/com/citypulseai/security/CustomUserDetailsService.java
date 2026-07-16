package com.citypulseai.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.user.entity.User;
import com.citypulseai.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{

	private final UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepository.findByEmail(username)
			.orElseThrow(() -> new UsernameNotFoundException(AppConstants.USER_NOT_FOUND));
		
		return new CustomUserDetails(user);
	}

}
