package com.citypulseai.ai.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.citypulseai.ai.entity.AIAnalysis;
import com.citypulseai.complaint.entity.ComplaintStatus;
import com.citypulseai.complaint.enums.ComplaintPriority;
import com.citypulseai.department.entity.Department;

public interface AIAnalysisRepository extends JpaRepository<AIAnalysis, Long> {

    Optional<AIAnalysis> findByAnalysisId(String analysisId);

    Optional<AIAnalysis> findByComplaint_ComplaintId(String complaintId);

    boolean existsByComplaint_ComplaintId(String complaintId);
    
    /**
    	 * Complaints a department manager still has to act on.
    	 * Before anyone accepts the AI result, the complaint's own department
    	 * is still empty, so membership comes from the suggested department.
    	 * Once a department is set (manager accepted, or an admin assigned it
    	 * by hand after a failed analysis), membership follows that department.
    	 */
    @Query("""
    	    SELECT ai
    	    FROM AIAnalysis ai
    	    JOIN FETCH ai.complaint c
    	    WHERE c.assignedOfficer IS NULL
    	      AND (
    	            (
    	                c.status = com.citypulseai.complaint.entity.ComplaintStatus.OPEN
    	            AND ai.status = com.citypulseai.ai.enums.AIAnalysisStatus.COMPLETED
    	            AND ai.suggestedDepartment = :department
    	            )
    	         OR (
    	                c.status = com.citypulseai.complaint.entity.ComplaintStatus.UNDER_REVIEW
    	            AND (
    	                    c.department = :department
    	                 OR (
    	                        c.department IS NULL
    	                    AND ai.suggestedDepartment = :department
    	                    )
    	                )
    	            )
    	      )
    	    ORDER BY c.createdAt DESC
    	""")
    	List<AIAnalysis> findComplaintQueueByDepartment(
    	        @Param("department") Department department);

    @Query("""
    	    SELECT COUNT(ai)
    	    FROM AIAnalysis ai
    	    JOIN ai.complaint c
    	    WHERE c.assignedOfficer IS NULL
    	      AND (
    	            (
    	                c.status = com.citypulseai.complaint.entity.ComplaintStatus.OPEN
    	            AND ai.status = com.citypulseai.ai.enums.AIAnalysisStatus.COMPLETED
    	            AND ai.suggestedDepartment = :department
    	            )
    	         OR (
    	                c.status = com.citypulseai.complaint.entity.ComplaintStatus.UNDER_REVIEW
    	            AND (
    	                    c.department = :department
    	                 OR (
    	                        c.department IS NULL
    	                    AND ai.suggestedDepartment = :department
    	                    )
    	                )
    	            )
    	      )
    	""")
    	long countComplaintQueue(@Param("department") Department department);

    @Query("""
    	    SELECT COUNT(ai)
    	    FROM AIAnalysis ai
    	    JOIN ai.complaint c
    	    WHERE c.department IS NULL
    	      AND c.status = com.citypulseai.complaint.entity.ComplaintStatus.OPEN
    	      AND ai.status = com.citypulseai.ai.enums.AIAnalysisStatus.COMPLETED
    	      AND ai.suggestedDepartment = :department
    	""")
    	long countUnassignedOpen(@Param("department") Department department);

    @Query("""
    	    SELECT COUNT(ai)
    	    FROM AIAnalysis ai
    	    JOIN ai.complaint c
    	    WHERE c.department IS NULL
    	      AND c.status = com.citypulseai.complaint.entity.ComplaintStatus.OPEN
    	      AND ai.status = com.citypulseai.ai.enums.AIAnalysisStatus.COMPLETED
    	      AND ai.suggestedDepartment = :department
    	      AND ai.priority = :priority
    	""")
    	long countUnassignedOpenByAiPriority(
    	        @Param("department") Department department,
    	        @Param("priority") ComplaintPriority priority);

    @Query("""
    	    SELECT ai.priority, COUNT(ai)
    	    FROM AIAnalysis ai
    	    JOIN ai.complaint c
    	    WHERE c.department IS NULL
    	      AND c.status = com.citypulseai.complaint.entity.ComplaintStatus.OPEN
    	      AND ai.status = com.citypulseai.ai.enums.AIAnalysisStatus.COMPLETED
    	      AND ai.suggestedDepartment = :department
    	    GROUP BY ai.priority
    	""")
    	List<Object[]> countUnassignedOpenGroupedByPriority(
    	        @Param("department") Department department);

    @Query("""
    	    SELECT YEAR(c.createdAt), MONTH(c.createdAt), COUNT(ai)
    	    FROM AIAnalysis ai
    	    JOIN ai.complaint c
    	    WHERE c.department IS NULL
    	      AND c.status = com.citypulseai.complaint.entity.ComplaintStatus.OPEN
    	      AND ai.status = com.citypulseai.ai.enums.AIAnalysisStatus.COMPLETED
    	      AND ai.suggestedDepartment = :department
    	      AND c.createdAt >= :from
    	    GROUP BY YEAR(c.createdAt), MONTH(c.createdAt)
    	""")
    	List<Object[]> countUnassignedOpenFiledByMonth(
    	        @Param("department") Department department,
    	        @Param("from") LocalDateTime from);

    @Query("""
    	    SELECT ai.complaint.complaintId
    	    FROM AIAnalysis ai
    	    WHERE ai.status = com.citypulseai.ai.enums.AIAnalysisStatus.FAILED
    	      AND ai.complaint.department IS NULL
    	""")
    	List<String> findComplaintIdsNeedingManualAssignment();

    boolean existsByComplaint_ComplaintIdAndStatusAndComplaint_DepartmentIsNull(
    	        String complaintId,
    	        com.citypulseai.ai.enums.AIAnalysisStatus status);

    
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