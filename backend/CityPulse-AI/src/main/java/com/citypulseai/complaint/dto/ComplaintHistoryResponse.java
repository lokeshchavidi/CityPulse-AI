package com.citypulseai.complaint.dto;

import java.time.LocalDateTime;

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
public class ComplaintHistoryResponse {

    private String action;

    private String performedBy;

    private String remarks;

    private String oldValue;

    private String newValue;

    private LocalDateTime createdAt;
}