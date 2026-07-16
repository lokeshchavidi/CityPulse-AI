package com.citypulseai.departmentmanager.dto;

import com.citypulseai.complaint.enums.ComplaintPriority;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class OverrideAIRecommendationRequest {

    @NotNull(message = "Department is required")
    private Long departmentId;

    @NotNull(message = "Priority is required")
    private ComplaintPriority priority;

    @NotBlank(message = "Remarks are required")
    @Size(max = 1000, message = "Remarks cannot exceed 1000 characters")
    private String remarks;
}