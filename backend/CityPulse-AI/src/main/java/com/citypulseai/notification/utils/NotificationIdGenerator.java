package com.citypulseai.notification.utils;

import org.springframework.stereotype.Component;

import com.citypulseai.notification.entity.NotificationSequence;
import com.citypulseai.notification.repository.NotificationSequenceRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificationIdGenerator {

	private final NotificationSequenceRepository notificationSequenceRepository;
	
	public String generateNotificationId() {
		
		NotificationSequence notificationSequence = notificationSequenceRepository.findById(1L)
			.orElseThrow();
		
		Long currentSequence = notificationSequence.getNextValue();
	
		notificationSequence.setNextValue(currentSequence + 1);
		
		notificationSequenceRepository.save(notificationSequence);
		
		return "NOT-" + String.format("%05d", currentSequence);	
	
	}
}
