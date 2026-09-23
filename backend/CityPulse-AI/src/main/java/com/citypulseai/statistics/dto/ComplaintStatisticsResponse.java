package com.citypulseai.statistics.dto;

import java.util.List;

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
public class ComplaintStatisticsResponse {

    private Long totalComplaints;

    private Long openComplaints;

    private Long resolvedComplaints;

    private Long criticalComplaints;

    private Double resolutionRate;

    private List<NamedCountResponse> statusBreakdown;

    private List<NamedCountResponse> priorityBreakdown;

    private List<NamedCountResponse> departmentBreakdown;

    private List<MonthlyTrendPointResponse> monthlyTrend;
}
