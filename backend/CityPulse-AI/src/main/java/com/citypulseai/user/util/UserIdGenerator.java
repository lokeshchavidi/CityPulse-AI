package com.citypulseai.user.util;

import org.springframework.stereotype.Component;

import com.citypulseai.user.entity.UserSequence;
import com.citypulseai.user.repository.UserSequenceRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserIdGenerator {

	private final UserSequenceRepository userSequenceRepository;
	
	@Transactional
	public String generateUserId() {
		
		UserSequence userSequence = userSequenceRepository.findById(1L)
			.orElseThrow();
		
		Long currentSequence = userSequence.getNextValue();
		userSequence.setNextValue(currentSequence + 1);
		userSequenceRepository.save(userSequence);
		
		return "USR-" + String.format("%03d", currentSequence);
	}
}
