package com.citypulseai.common.service.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.common.service.CurrentUserService;
import com.citypulseai.security.CustomUserDetails;
import com.citypulseai.user.entity.User;
import com.citypulseai.user.exception.UserNotFoundException;
import com.citypulseai.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CurrentUserServiceImpl implements CurrentUserService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        return userRepository
                .findByEmailWithDepartment(userDetails.getUsername())
                .orElseThrow(() ->
                        new UserNotFoundException(
                                AppConstants.AUTHENTICATED_USER_NOT_FOUND));
    }
}