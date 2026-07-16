package com.citypulseai.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.citypulseai.complaint.entity.ComplaintSequence;
import com.citypulseai.complaint.repository.ComplaintSequenceRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ComplaintSequenceInitializer implements CommandLineRunner {

	private final ComplaintSequenceRepository complaintSequenceRepository;
	@Override
	public void run(String... args) throws Exception {
		
		if(!complaintSequenceRepository.existsById(1L)) {
			
			complaintSequenceRepository.save(
					ComplaintSequence.builder()
						.id(1L)
						.nextValue(1L)
						.build());
		}
		
	}

}
