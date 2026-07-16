package com.citypulseai.complaint.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.citypulseai.complaint.dto.AssignDepartmentRequest;
import com.citypulseai.complaint.dto.AssignOfficerRequest;
import com.citypulseai.complaint.dto.ComplaintResponse;
import com.citypulseai.complaint.dto.CreateComplaintRequest;
import com.citypulseai.complaint.dto.UpdateComplaintPriorityRequest;
import com.citypulseai.complaint.dto.UpdateComplaintStatusRequest;

import jakarta.validation.Valid;

public interface ComplaintService {


    /**
     * Creates a new complaint submitted by the authenticated citizen.
     *
     * @param request Contains the complaint details.
     * @param image   Complaint image uploaded by the citizen.
     * @return Created complaint details.
     */
    ComplaintResponse createComplaint(
            CreateComplaintRequest request,
            MultipartFile image);
	
	ComplaintResponse getComplaintById(String complaintId);
	
	List<ComplaintResponse> getMyComplaints();
	
	List<ComplaintResponse> getAllComplaints();
	
	ComplaintResponse updateComplaintStatus(String complaintId, UpdateComplaintStatusRequest request);
	
	ComplaintResponse assignDepartment(String complaintId, AssignDepartmentRequest departmentRequest);
	
	ComplaintResponse assignOfficer(String complaintId, AssignOfficerRequest officerRequest);

	ComplaintResponse updateComplaintPriority(String complaintId,
			UpdateComplaintPriorityRequest priorityRequest);
}
