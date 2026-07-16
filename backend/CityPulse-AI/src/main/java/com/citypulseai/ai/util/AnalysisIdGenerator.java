package com.citypulseai.ai.util;

import org.springframework.stereotype.Component;

import com.citypulseai.ai.entity.AnalysisSequence;
import com.citypulseai.ai.exception.AnalysisSequenceNotFoundException;
import com.citypulseai.ai.repository.AnalysisSequenceRepository;
import com.citypulseai.common.constants.AppConstants;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnalysisIdGenerator {

	private final AnalysisSequenceRepository analysisSequenceRepository;
	
	public String generateAnalysisId() {
		
		AnalysisSequence analysisSequence = analysisSequenceRepository.findById(1L)
			.orElseThrow(() -> new AnalysisSequenceNotFoundException(AppConstants.ANALYSIS_SEQUENCE_NOT_FOUND));
		
		Long currentSequence = analysisSequence.getNextValue();
		
		analysisSequence.setNextValue(currentSequence + 1);
		
		analysisSequenceRepository.save(analysisSequence);
		
		return "ANA-" + String.format("%05d", currentSequence);
	}
	
}
