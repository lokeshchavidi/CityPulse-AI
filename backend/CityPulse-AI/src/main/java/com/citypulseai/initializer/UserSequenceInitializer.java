package com.citypulseai.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.citypulseai.user.entity.UserSequence;
import com.citypulseai.user.repository.UserSequenceRepository;

import lombok.RequiredArgsConstructor;

@Component
@Order(3)
@RequiredArgsConstructor
public class UserSequenceInitializer implements CommandLineRunner{

	private final UserSequenceRepository userSequenceRepository;

	@Override
	public void run(String... args) throws Exception {
		
		if(!userSequenceRepository.existsById(1L)) {
			UserSequence userSequence = UserSequence.builder()
			.id(1L)
			.nextValue(1L)
			.build();
			
			userSequenceRepository.save(userSequence);
		}
	}
}
