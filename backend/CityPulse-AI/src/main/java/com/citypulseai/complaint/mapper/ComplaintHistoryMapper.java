package com.citypulseai.complaint.mapper;

import org.springframework.stereotype.Component;

import com.citypulseai.complaint.dto.ComplaintHistoryResponse;
import com.citypulseai.complaint.entity.ComplaintHistory;

@Component
public class ComplaintHistoryMapper {

    public ComplaintHistoryResponse toResponse(ComplaintHistory history) {

        return ComplaintHistoryResponse.builder()
                .action(history.getAction().name())
                .performedBy(
                        history.getPerformedBy() != null
                                ? history.getPerformedBy().getFirstName()
                                        + " "
                                        + history.getPerformedBy().getLastName()
                                : "System")
                .remarks(history.getRemarks())
                .oldValue(history.getOldValue())
                .newValue(history.getNewValue())
                .createdAt(history.getCreatedAt())
                .build();
    }
}