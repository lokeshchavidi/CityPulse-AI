package com.citypulseai.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.citypulseai.ai.entity.AnalysisSequence;
import com.citypulseai.ai.repository.AnalysisSequenceRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnalysisSequenceInitializer implements CommandLineRunner{

	private final AnalysisSequenceRepository analysisSequenceRepository;

	@Override
	public void run(String... args) throws Exception {

		if(!analysisSequenceRepository.existsById(1L)) {
			analysisSequenceRepository.save(
					AnalysisSequence.builder()
						.id(1L)
						.nextValue(1L)
						.build());
		}
	}
	
	
}
