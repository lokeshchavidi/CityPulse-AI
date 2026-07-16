package com.citypulseai.officer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
public class ResolveComplaintRequest {

    @NotBlank(message = "Resolution remarks are required.")
    @Size(max = 1000)
    private String remarks;
}