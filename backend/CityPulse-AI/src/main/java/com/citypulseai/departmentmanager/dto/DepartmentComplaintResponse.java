package com.citypulseai.departmentmanager.dto;

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
public class DepartmentComplaintResponse {

	private String complaintId;
	
	private String title;
	
	private ComplaintPriority priority;
	
	private ComplaintStatus status;
	
	private String citizenName;
	
	private String address;
	
	private LocalDateTime createdAt;
}
