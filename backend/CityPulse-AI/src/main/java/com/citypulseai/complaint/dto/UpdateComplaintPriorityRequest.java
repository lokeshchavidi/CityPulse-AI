package com.citypulseai.complaint.dto;


import com.citypulseai.complaint.enums.ComplaintPriority;

import jakarta.validation.constraints.NotNull;
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
public class UpdateComplaintPriorityRequest {

    @NotNull(message = "Complaint priority is required.")
    private ComplaintPriority priority;

}
