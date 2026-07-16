package com.citypulseai.user.dto;

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
public class CitizenDashboardResponse {

    private long totalComplaints;

    private long openComplaints;

    private long underReviewComplaints;

    private long assignedComplaints;

    private long inProgressComplaints;

    private long resolvedComplaints;
}