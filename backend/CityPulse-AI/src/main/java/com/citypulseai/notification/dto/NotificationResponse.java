package com.citypulseai.notification.dto;

import java.time.LocalDateTime;

import com.citypulseai.notification.entity.NotificationType;

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
public class NotificationResponse {

    private String notificationId;

    private String complaintId;

    private String title;

    private String message;

    private NotificationType type;

    private boolean read;

    private LocalDateTime createdAt;
}