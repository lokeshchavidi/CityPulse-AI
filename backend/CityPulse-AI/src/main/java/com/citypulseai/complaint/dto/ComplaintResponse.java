package com.citypulseai.complaint.dto;

import java.time.LocalDateTime;

import com.citypulseai.complaint.entity.ComplaintStatus;
import com.citypulseai.complaint.enums.ComplaintPriority;

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
public class ComplaintResponse {

	private String complaintId;

	private String title;

	private String description;

	private Double latitude;

	private Double longitude;

	private String address;

	private String imageUrl;

	private ComplaintStatus status;

	private ComplaintPriority priority;

	private String departmentName;

	private String assignedOfficerName;

	private String citizenName;

	private LocalDateTime createdAt;

	/**
	 * True when automatic analysis failed and no department has been
	 * assigned yet, so an administrator still needs to route it.
	 */
	private boolean needsManualAssignment;
}