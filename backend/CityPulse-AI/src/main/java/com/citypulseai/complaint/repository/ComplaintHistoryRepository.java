package com.citypulseai.complaint.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.citypulseai.complaint.entity.ComplaintHistory;

public interface ComplaintHistoryRepository
        extends JpaRepository<ComplaintHistory, Long> {

    List<ComplaintHistory> findByComplaint_ComplaintIdOrderByCreatedAtAsc(
            String complaintId);
}