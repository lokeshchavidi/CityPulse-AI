package com.citypulseai.statistics.dto;

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
public class MonthlyTrendPointResponse {

    private Integer year;

    private Integer month;

    private String label;

    private Long filed;

    private Long resolved;
}
