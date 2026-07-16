package com.citypulseai.complaint.dto;

import com.citypulseai.complaint.entity.ComplaintStatus;

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
public class UpdateComplaintStatusRequest {

	@NotNull(message = "Complaint status is required")
	private ComplaintStatus status;
}
