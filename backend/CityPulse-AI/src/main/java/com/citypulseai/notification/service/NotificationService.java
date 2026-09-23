package com.citypulseai.notification.service;

import java.util.List;

import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.notification.dto.NotificationResponse;
import com.citypulseai.notification.entity.NotificationType;
import com.citypulseai.user.entity.User;

public interface NotificationService {

    void createNotification(
            User recipient,
            Complaint complaint,
            NotificationType type,
            String title,
            String message);

    List<NotificationResponse> getMyNotifications();

    List<NotificationResponse> getUnreadNotifications();

    long getUnreadCount();

    void markAsRead(String notificationId);

    void markAllAsRead();

    void deleteNotification(String notificationId);

    void deleteAllNotifications();

}
