package com.citypulseai.notification.service.impl;

import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citypulseai.common.service.CurrentUserService;
import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.notification.dto.NotificationResponse;
import com.citypulseai.notification.entity.Notification;
import com.citypulseai.notification.entity.NotificationType;
import com.citypulseai.notification.exception.NotificationNotFoundException;
import com.citypulseai.notification.mapper.NotificationMapper;
import com.citypulseai.notification.repository.NotificationRepository;
import com.citypulseai.notification.service.NotificationService;
import com.citypulseai.notification.utils.NotificationIdGenerator;
import com.citypulseai.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{

	private final NotificationRepository notificationRepository;

	private final NotificationMapper notificationMapper;

	private final NotificationIdGenerator notificationIdGenerator;

	private final CurrentUserService currentUserService;

	@Override
	@Transactional
	public void createNotification(
	        User recipient,
	        Complaint complaint,
	        NotificationType type,
	        String title,
	        String message) {

	    Notification notification = Notification.builder()
	            .notificationId(notificationIdGenerator.generateNotificationId())
	            .recipient(recipient)
	            .complaint(complaint)
	            .type(type)
	            .title(title)
	            .message(message)
	            .build();

	    notificationRepository.save(notification);
	}

	@Override
	@Transactional(readOnly = true)
	public List<NotificationResponse> getMyNotifications() {

	    User currentUser = currentUserService.getCurrentUser();

	    return notificationRepository
	            .findByRecipientOrderByCreatedAtDesc(currentUser)
	            .stream()
	            .map(notificationMapper::toResponse)
	            .toList();
	}

	@Override
	@Transactional(readOnly = true)
	public List<NotificationResponse> getUnreadNotifications() {

	    User currentUser = currentUserService.getCurrentUser();

	    return notificationRepository
	            .findByRecipientAndReadFalseOrderByCreatedAtDesc(currentUser)
	            .stream()
	            .map(notificationMapper::toResponse)
	            .toList();
	}

	@Override
	@Transactional(readOnly = true)
	public long getUnreadCount() {

	    User currentUser = currentUserService.getCurrentUser();

	    return notificationRepository.countByRecipientAndReadFalse(currentUser);
	}

	@Override
	@Transactional
	public void markAsRead(String notificationId) {

	    User currentUser = currentUserService.getCurrentUser();

	    Notification notification = notificationRepository
	            .findByNotificationId(notificationId)
	            .orElseThrow(() ->
	                    new NotificationNotFoundException(
	                            "Notification not found with ID: "
	                                    + notificationId));

	    if (!notification.getRecipient().getUserId()
	            .equals(currentUser.getUserId())) {

	        throw new AccessDeniedException(
	                "You are not authorized to access this notification.");
	    }

	    notification.setRead(true);

	    notificationRepository.save(notification);
	}
	
	@Override
	@Transactional
	public void markAllAsRead() {

	    User currentUser = currentUserService.getCurrentUser();

	    List<Notification> notifications =
	            notificationRepository
	                    .findByRecipientAndReadFalseOrderByCreatedAtDesc(currentUser);

	    notifications.forEach(notification -> notification.setRead(true));

	    notificationRepository.saveAll(notifications);
	}

	@Override
	@Transactional
	public void deleteNotification(String notificationId) {

	    User currentUser = currentUserService.getCurrentUser();

	    Notification notification = notificationRepository
	            .findByNotificationId(notificationId)
	            .orElseThrow(() ->
	                    new NotificationNotFoundException(
	                            "Notification not found with ID: "
	                                    + notificationId));

	    if (!notification.getRecipient().getUserId()
	            .equals(currentUser.getUserId())) {

	        throw new AccessDeniedException(
	                "You are not authorized to delete this notification.");
	    }

	    notificationRepository.delete(notification);
	}

	@Override
	@Transactional
	public void deleteAllNotifications() {

	    User currentUser = currentUserService.getCurrentUser();

	    notificationRepository.deleteByRecipient(currentUser);
	}

}
