package com.citypulseai.notification.mapper;

import org.springframework.stereotype.Component;

import com.citypulseai.notification.dto.NotificationResponse;
import com.citypulseai.notification.entity.Notification;

@Component
public class NotificationMapper {

    public NotificationResponse toResponse(Notification notification) {

        return NotificationResponse.builder()
                .notificationId(notification.getNotificationId())
                .complaintId(
                        notification.getComplaint() != null
                                ? notification.getComplaint().getComplaintId()
                                : null)
                .title(notification.getTitle())
                .message(notification.getMessage())
                .type(notification.getType())
                .read(notification.isRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}