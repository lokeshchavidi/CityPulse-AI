package com.citypulseai.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardResponse {

    private Long totalComplaints;

    private Long openComplaints;

    private Long underReviewComplaints;

    private Long assignedComplaints;

    private Long inProgressComplaints;

    private Long resolvedComplaints;

    private Long criticalComplaints;

    private Long totalCitizens;

    private Long totalOfficers;

    private Long totalDepartmentManagers;

    private Long totalDepartments;
}
