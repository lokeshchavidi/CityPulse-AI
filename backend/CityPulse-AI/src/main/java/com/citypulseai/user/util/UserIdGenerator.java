package com.citypulseai.user.util;

import org.springframework.stereotype.Component;

import com.citypulseai.user.entity.UserSequence;
import com.citypulseai.user.repository.UserRepository;
import com.citypulseai.user.repository.UserSequenceRepository;

import jakarta.transaction.Transactional;
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
		String userId;

		// Skip IDs that already exist when the sequence row was reset or
		// recreated while users remained (common after a fresh deploy against
		// an existing MySQL database).
		do {
			userId = "USR-" + String.format("%03d", currentSequence);
			currentSequence++;
		} while (userRepository.existsByUserId(userId));

		userSequence.setNextValue(currentSequence);
		userSequenceRepository.save(userSequence);

		return userId;
	}
}
