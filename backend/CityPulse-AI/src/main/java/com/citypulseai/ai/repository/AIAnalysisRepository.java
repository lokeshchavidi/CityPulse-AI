package com.citypulseai.ai.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.citypulseai.ai.entity.AIAnalysis;
import com.citypulseai.complaint.entity.ComplaintStatus;
import com.citypulseai.department.entity.Department;

public interface AIAnalysisRepository extends JpaRepository<AIAnalysis, Long> {

    Optional<AIAnalysis> findByAnalysisId(String analysisId);

    Optional<AIAnalysis> findByComplaint_ComplaintId(String complaintId);

    boolean existsByComplaint_ComplaintId(String complaintId);
    
    @Query("""
    	    SELECT ai
    	    FROM AIAnalysis ai
    	    JOIN FETCH ai.complaint c
    	    WHERE ai.suggestedDepartment = :department
    	      AND (
    	            c.status = com.citypulseai.complaint.entity.ComplaintStatus.OPEN
    	         OR (
    	                c.status = com.citypulseai.complaint.entity.ComplaintStatus.UNDER_REVIEW
    	            AND c.assignedOfficer IS NULL
    	         )
    	      )
    	    ORDER BY c.createdAt DESC
    	""")
    	List<AIAnalysis> findComplaintQueueByDepartment(
    	        @Param("department") Department department);

    
    @Query("""
    	    SELECT ai
    	    FROM AIAnalysis ai
    	    JOIN FETCH ai.complaint c
    	    WHERE ai.suggestedDepartment = :department
    	      AND c.status = :status
    	""")
    	List<AIAnalysis> findComplaintQueueByDepartment(
    	        @Param("department") Department department,
    	        @Param("status") ComplaintStatus status);
}