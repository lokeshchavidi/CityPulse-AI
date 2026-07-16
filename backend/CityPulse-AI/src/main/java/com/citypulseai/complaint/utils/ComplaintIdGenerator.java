package com.citypulseai.complaint.utils;

import org.springframework.stereotype.Component;

import com.citypulseai.complaint.entity.ComplaintSequence;
import com.citypulseai.complaint.repository.ComplaintSequenceRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ComplaintIdGenerator {

	private final ComplaintSequenceRepository complaintSequenceRepository;
	
	public String generateComplaintId() {
		
		ComplaintSequence complaintSequence = complaintSequenceRepository.findById(1L)
			.orElseThrow();
		
		Long currentSequence = complaintSequence.getNextValue();
		complaintSequence.setNextValue(currentSequence + 1);
		complaintSequenceRepository.save(complaintSequence);
		
		return "CMP-" + String.format("%05d", currentSequence);
	}
}
