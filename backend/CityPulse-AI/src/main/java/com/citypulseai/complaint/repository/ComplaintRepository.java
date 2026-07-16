package com.citypulseai.complaint.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

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
    
    List<Complaint> findByDepartmentAndStatusIn(
            Department department,
            List<ComplaintStatus> statuses);

    List<Complaint> findByDepartmentAndStatus(
            Department department,
            ComplaintStatus status);
}