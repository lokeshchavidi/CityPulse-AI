package com.citypulseai.ai.dto;

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
public class AIAnalysisRequest {

	/**
	 * Business complaint identifier. Example: CMP-00001
	 */
	private String complaintId;

	/**
	 * Complaint title.
	 */
	private String title;

	/**
	 * Complaint description.
	 */
	private String description;

	/**
	 * Public Cloudinary image URL.
	 */
	private String imageUrl;

	/**
	 * Complaint latitude.
	 */
	private Double latitude;

	/**
	 * Complaint longitude.
	 */
	private Double longitude;

	/**
	 * Complaint address.
	 */
	private String address;

}
