package com.citypulseai.complaint.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.common.service.CurrentUserService;
import com.citypulseai.complaint.dto.ComplaintHistoryResponse;
import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.complaint.entity.ComplaintHistory;
import com.citypulseai.complaint.enums.ComplaintHistoryAction;
import com.citypulseai.complaint.exception.ComplaintNotFoundException;
import com.citypulseai.complaint.mapper.ComplaintHistoryMapper;
import com.citypulseai.complaint.repository.ComplaintHistoryRepository;
import com.citypulseai.complaint.repository.ComplaintRepository;
import com.citypulseai.complaint.service.ComplaintAccessValidator;
import com.citypulseai.complaint.service.ComplaintHistoryService;
import com.citypulseai.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComplaintHistoryServiceImpl
        implements ComplaintHistoryService {

    private final ComplaintHistoryRepository complaintHistoryRepository;
    private final ComplaintHistoryMapper complaintHistoryMapper;
    private final ComplaintRepository complaintRepository;
    private final CurrentUserService currentUserService;
    private final ComplaintAccessValidator complaintAccessValidator;
    
    @Override
    public void recordHistory(
            Complaint complaint,
            ComplaintHistoryAction action,
            User performedBy,
            String oldValue,
            String newValue,
            String remarks) {

        ComplaintHistory history = ComplaintHistory.builder()
                .complaint(complaint)
                .action(action)
                .performedBy(performedBy)
                .oldValue(oldValue)
                .newValue(newValue)
                .remarks(remarks)
                .build();

        complaintHistoryRepository.save(history);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ComplaintHistoryResponse> getComplaintHistory(
            String complaintId) {

        // Previously this returned a complaint's full history to any
        // authenticated Citizen/Officer/Department Manager/Admin regardless
        // of whether they had any relationship to that complaint — the
        // same guessable-ID problem as ComplaintServiceImpl.getComplaintById.
        Complaint complaint = complaintRepository.findByComplaintId(complaintId)
                .orElseThrow(() -> new ComplaintNotFoundException(
                        AppConstants.COMPLAINT_NOT_FOUND));

        complaintAccessValidator.validateAccess(
                complaint,
                currentUserService.getCurrentUser());

        List<ComplaintHistory> history =
                complaintHistoryRepository
                        .findByComplaint_ComplaintIdOrderByCreatedAtAsc(
                                complaintId);

        return history.stream()
                .map(complaintHistoryMapper::toResponse)
                .toList();
    }
}