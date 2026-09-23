package com.citypulseai.officer.service;

import java.util.List;

import com.citypulseai.complaint.dto.ComplaintResponse;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintDetailsResponse;
import com.citypulseai.departmentmanager.dto.DepartmentComplaintResponse;
import com.citypulseai.officer.dto.OfficerDashboardResponse;
import com.citypulseai.officer.dto.ResolveComplaintRequest;
import com.citypulseai.statistics.dto.ComplaintStatisticsResponse;

public interface OfficerService {

	List<DepartmentComplaintResponse> getMyAssignedComplaints();
	
	DepartmentComplaintDetailsResponse getComplaintDetails(String complaintId);

	ComplaintResponse startWork(String complaintId);
	
	ComplaintResponse resolveComplaint(
	        String complaintId,
	        ResolveComplaintRequest request);
	
	OfficerDashboardResponse getDashboard();

	ComplaintStatisticsResponse getStatistics();
}
