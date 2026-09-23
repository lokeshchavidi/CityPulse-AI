package com.citypulseai.notification.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.citypulseai.notification.entity.Notification;
import com.citypulseai.user.entity.User;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByRecipientOrderByCreatedAtDesc(User recipient);

    List<Notification> findByRecipientAndReadFalseOrderByCreatedAtDesc(User recipient);

    long countByRecipientAndReadFalse(User recipient);

    Optional<Notification> findByNotificationId(String notificationId);

    void deleteByRecipient(User recipient);

}