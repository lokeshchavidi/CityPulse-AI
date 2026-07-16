package com.citypulseai.departmentmanager.dto;

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
public class DepartmentDashboardResponse {

    private long pendingReviewComplaints;

    private long assignedComplaints;

    private long inProgressComplaints;

    private long resolvedComplaints;

    private long criticalComplaints;

}