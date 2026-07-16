package com.citypulseai.departmentmanager.dto;

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
public class OfficerResponse {

    private String officerId;

    private String officerName;

    private String email;

    private String phoneNumber;
}