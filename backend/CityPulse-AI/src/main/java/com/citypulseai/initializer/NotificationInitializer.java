package com.citypulseai.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.citypulseai.notification.entity.NotificationSequence;
import com.citypulseai.notification.repository.NotificationSequenceRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificationInitializer implements CommandLineRunner{

	private final NotificationSequenceRepository notificationSequenceRepository;
	
	@Override
	public void run(String... args) throws Exception {

		if(!notificationSequenceRepository.existsById(1L)) {
			
			notificationSequenceRepository.save(
					NotificationSequence.builder()
						.id(1L)
						.nextValue(1L)
						.build());
		}
	}

}
