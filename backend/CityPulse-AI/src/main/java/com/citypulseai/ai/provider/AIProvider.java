package com.citypulseai.ai.provider;

import com.citypulseai.ai.dto.AIAnalysisRequest;
import com.citypulseai.ai.dto.AIAnalysisResponse;

public interface AIProvider {

    /**
     * Sends the complaint to the configured AI model
     * and returns the AI analysis.
     *
     * @param request Complaint details to analyze.
     * @return AI analysis response.
     */
    AIAnalysisResponse analyzeComplaint(AIAnalysisRequest request);

}