package com.citypulseai.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterUserResponse {

    private String userId;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String role;

    private String department;

    private boolean enabled;
}
