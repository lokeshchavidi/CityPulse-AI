package com.citypulseai.ai.service;

import com.citypulseai.ai.dto.AIAnalysisResponse;

public interface AIService {

	void analyzeComplaint(String complaintId);
	
	AIAnalysisResponse getAnalysisByComplaintId(String complaintId);
}