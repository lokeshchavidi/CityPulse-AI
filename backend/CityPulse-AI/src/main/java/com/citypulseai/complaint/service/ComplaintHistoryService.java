package com.citypulseai.complaint.service;

import java.util.List;

import com.citypulseai.complaint.dto.ComplaintHistoryResponse;
import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.complaint.enums.ComplaintHistoryAction;
import com.citypulseai.user.entity.User;

public interface ComplaintHistoryService {

    void recordHistory(
            Complaint complaint,
            ComplaintHistoryAction action,
            User performedBy,
            String oldValue,
            String newValue,
            String remarks);
    
    List<ComplaintHistoryResponse> getComplaintHistory(String complaintId);

}