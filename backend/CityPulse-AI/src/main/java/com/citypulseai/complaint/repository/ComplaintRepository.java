package com.citypulseai.complaint.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.complaint.entity.ComplaintStatus;
import com.citypulseai.complaint.enums.ComplaintPriority;
import com.citypulseai.department.entity.Department;
import com.citypulseai.user.entity.User;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    @EntityGraph(attributePaths = {
            "citizen",
            "assignedOfficer",
            "department"
    })
    Optional<Complaint> findByComplaintId(String complaintId);

    @EntityGraph(attributePaths = {
            "citizen",
            "assignedOfficer",
            "department"
    })
    @Query("SELECT c FROM Complaint c ORDER BY c.createdAt DESC")
    List<Complaint> findAllWithAssociations();

    boolean existsByComplaintId(String complaintId);

    List<Complaint> findByCitizen(User citizen);

    List<Complaint> findByAssignedOfficerAndStatus(
            User assignedOfficer,
            ComplaintStatus status);

    @EntityGraph(attributePaths = {
            "citizen",
            "assignedOfficer",
            "department"
    })
    List<Complaint> findByAssignedOfficer(User assignedOfficer);

    long countByStatus(ComplaintStatus status);

    long countByPriority(ComplaintPriority priority);

    long countByCitizen(User citizen);

    long countByCitizenAndStatus(User citizen, ComplaintStatus status);

    long countByAssignedOfficerAndStatus(User officer, ComplaintStatus status);

    long countByDepartmentAndStatus(
            Department department,
            ComplaintStatus status);

    long countByDepartmentAndPriority(
            Department department,
            ComplaintPriority priority);

    long countByCitizenAndPriority(User citizen, ComplaintPriority priority);

    long countByAssignedOfficerAndPriority(User officer, ComplaintPriority priority);

    long countByAssignedOfficer(User officer);

    long countByDepartment(Department department);
    
    List<Complaint> findByDepartmentAndStatusIn(
            Department department,
            List<ComplaintStatus> statuses);

    List<Complaint> findByDepartmentAndStatus(
            Department department,
            ComplaintStatus status);

    @Query("""
            SELECT c.status, COUNT(c)
            FROM Complaint c
            GROUP BY c.status
            """)
    List<Object[]> countGroupedByStatus();

    @Query("""
            SELECT c.status, COUNT(c)
            FROM Complaint c
            WHERE c.citizen = :citizen
            GROUP BY c.status
            """)
    List<Object[]> countGroupedByStatusForCitizen(@Param("citizen") User citizen);

    @Query("""
            SELECT c.status, COUNT(c)
            FROM Complaint c
            WHERE c.assignedOfficer = :officer
            GROUP BY c.status
            """)
    List<Object[]> countGroupedByStatusForOfficer(@Param("officer") User officer);

    @Query("""
            SELECT c.status, COUNT(c)
            FROM Complaint c
            WHERE c.department = :department
            GROUP BY c.status
            """)
    List<Object[]> countGroupedByStatusForDepartment(
            @Param("department") Department department);

    @Query("""
            SELECT c.priority, COUNT(c)
            FROM Complaint c
            GROUP BY c.priority
            """)
    List<Object[]> countGroupedByPriority();

    @Query("""
            SELECT c.priority, COUNT(c)
            FROM Complaint c
            WHERE c.citizen = :citizen
            GROUP BY c.priority
            """)
    List<Object[]> countGroupedByPriorityForCitizen(@Param("citizen") User citizen);

    @Query("""
            SELECT c.priority, COUNT(c)
            FROM Complaint c
            WHERE c.assignedOfficer = :officer
            GROUP BY c.priority
            """)
    List<Object[]> countGroupedByPriorityForOfficer(@Param("officer") User officer);

    @Query("""
            SELECT c.priority, COUNT(c)
            FROM Complaint c
            WHERE c.department = :department
            GROUP BY c.priority
            """)
    List<Object[]> countGroupedByPriorityForDepartment(
            @Param("department") Department department);

    @Query("""
            SELECT COALESCE(d.departmentName, 'Unassigned'), COUNT(c)
            FROM Complaint c
            LEFT JOIN c.department d
            GROUP BY d.departmentName
            ORDER BY COUNT(c) DESC
            """)
    List<Object[]> countGroupedByDepartment();

    @Query("""
            SELECT YEAR(c.createdAt), MONTH(c.createdAt), COUNT(c)
            FROM Complaint c
            WHERE c.createdAt >= :from
            GROUP BY YEAR(c.createdAt), MONTH(c.createdAt)
            ORDER BY YEAR(c.createdAt), MONTH(c.createdAt)
            """)
    List<Object[]> countFiledByMonthSince(@Param("from") LocalDateTime from);

    @Query("""
            SELECT YEAR(c.createdAt), MONTH(c.createdAt), COUNT(c)
            FROM Complaint c
            WHERE c.citizen = :citizen
              AND c.createdAt >= :from
            GROUP BY YEAR(c.createdAt), MONTH(c.createdAt)
            ORDER BY YEAR(c.createdAt), MONTH(c.createdAt)
            """)
    List<Object[]> countFiledByMonthSinceForCitizen(
            @Param("citizen") User citizen,
            @Param("from") LocalDateTime from);

    @Query("""
            SELECT YEAR(c.createdAt), MONTH(c.createdAt), COUNT(c)
            FROM Complaint c
            WHERE c.assignedOfficer = :officer
              AND c.createdAt >= :from
            GROUP BY YEAR(c.createdAt), MONTH(c.createdAt)
            ORDER BY YEAR(c.createdAt), MONTH(c.createdAt)
            """)
    List<Object[]> countFiledByMonthSinceForOfficer(
            @Param("officer") User officer,
            @Param("from") LocalDateTime from);

    @Query("""
            SELECT YEAR(c.createdAt), MONTH(c.createdAt), COUNT(c)
            FROM Complaint c
            WHERE c.department = :department
              AND c.createdAt >= :from
            GROUP BY YEAR(c.createdAt), MONTH(c.createdAt)
            ORDER BY YEAR(c.createdAt), MONTH(c.createdAt)
            """)
    List<Object[]> countFiledByMonthSinceForDepartment(
            @Param("department") Department department,
            @Param("from") LocalDateTime from);

    @Query("""
            SELECT YEAR(c.updatedAt), MONTH(c.updatedAt), COUNT(c)
            FROM Complaint c
            WHERE c.status = :status
              AND c.updatedAt >= :from
            GROUP BY YEAR(c.updatedAt), MONTH(c.updatedAt)
            ORDER BY YEAR(c.updatedAt), MONTH(c.updatedAt)
            """)
    List<Object[]> countByStatusUpdatedByMonthSince(
            @Param("status") ComplaintStatus status,
            @Param("from") LocalDateTime from);

    @Query("""
            SELECT YEAR(c.updatedAt), MONTH(c.updatedAt), COUNT(c)
            FROM Complaint c
            WHERE c.citizen = :citizen
              AND c.status = :status
              AND c.updatedAt >= :from
            GROUP BY YEAR(c.updatedAt), MONTH(c.updatedAt)
            ORDER BY YEAR(c.updatedAt), MONTH(c.updatedAt)
            """)
    List<Object[]> countByStatusUpdatedByMonthSinceForCitizen(
            @Param("citizen") User citizen,
            @Param("status") ComplaintStatus status,
            @Param("from") LocalDateTime from);

    @Query("""
            SELECT YEAR(c.updatedAt), MONTH(c.updatedAt), COUNT(c)
            FROM Complaint c
            WHERE c.assignedOfficer = :officer
              AND c.status = :status
              AND c.updatedAt >= :from
            GROUP BY YEAR(c.updatedAt), MONTH(c.updatedAt)
            ORDER BY YEAR(c.updatedAt), MONTH(c.updatedAt)
            """)
    List<Object[]> countByStatusUpdatedByMonthSinceForOfficer(
            @Param("officer") User officer,
            @Param("status") ComplaintStatus status,
            @Param("from") LocalDateTime from);

    @Query("""
            SELECT YEAR(c.updatedAt), MONTH(c.updatedAt), COUNT(c)
            FROM Complaint c
            WHERE c.department = :department
              AND c.status = :status
              AND c.updatedAt >= :from
            GROUP BY YEAR(c.updatedAt), MONTH(c.updatedAt)
            ORDER BY YEAR(c.updatedAt), MONTH(c.updatedAt)
            """)
    List<Object[]> countByStatusUpdatedByMonthSinceForDepartment(
            @Param("department") Department department,
            @Param("status") ComplaintStatus status,
            @Param("from") LocalDateTime from);
}