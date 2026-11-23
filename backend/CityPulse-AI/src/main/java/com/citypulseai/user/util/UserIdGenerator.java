package com.citypulseai.user.util;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.citypulseai.user.entity.UserSequence;
import com.citypulseai.user.repository.UserRepository;
import com.citypulseai.user.repository.UserSequenceRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserIdGenerator {

	private final UserSequenceRepository userSequenceRepository;
	private final UserRepository userRepository;

	@Transactional
	public String generateUserId() {

		UserSequence userSequence = userSequenceRepository.findById(1L)
				.orElseThrow(() -> new IllegalStateException("User sequence is not initialized."));

		Long currentSequence = userSequence.getNextValue();
		if (currentSequence == null || currentSequence < 1L) {
			currentSequence = 1L;
		}

		Long maxExisting = userRepository.findMaxUserSequenceValue();
		if (maxExisting != null && maxExisting >= currentSequence) {
			currentSequence = maxExisting + 1L;
		}

		String userId;
		do {
			userId = "USR-" + String.format("%03d", currentSequence);
			currentSequence++;
		} while (userRepository.existsByUserId(userId));

		userSequence.setNextValue(currentSequence);
		userSequenceRepository.save(userSequence);

		return userId;
	}
}
