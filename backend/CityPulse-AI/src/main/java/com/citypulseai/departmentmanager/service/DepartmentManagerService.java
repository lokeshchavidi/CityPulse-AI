package com.citypulseai.departmentmanager.service;

import java.util.List;

import com.citypulseai.complaint.dto.ComplaintResponse;
import com.citypulseai.departmentmanager.dto.AssignOfficerRequest;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintDetailsResponse;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintResponse;
import com.citypulseai.departmentmanager.dto.DepartmentDashboardResponse;
import com.citypulseai.departmentmanager.dto.OfficerResponse;
import com.citypulseai.departmentmanager.dto.OverrideAIRecommendationRequest;

import jakarta.validation.Valid;

public interface DepartmentManagerService {

	List<DepartmentComplaintResponse> getComplaintQueue();

	DepartmentComplaintDetailsResponse getComplaintDetails(String complaintId);

	ComplaintResponse acceptAIRecommendation(String complaintId);
	
	List<OfficerResponse> getAvailableOfficers();

	ComplaintResponse assignOfficer(String complaintId, @Valid AssignOfficerRequest request);

	DepartmentDashboardResponse getDashboard();
	
	ComplaintResponse overrideAIRecommendation(
	        String complaintId,
	        OverrideAIRecommendationRequest request);
	
	List<DepartmentComplaintResponse> getActiveComplaints();

	List<DepartmentComplaintResponse> getResolvedComplaints();
}
