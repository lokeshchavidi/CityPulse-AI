package com.citypulseai.officer.dto;

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
public class OfficerDashboardResponse {

    private long assignedComplaints;

    private long inProgressComplaints;

    private long resolvedComplaints;

}