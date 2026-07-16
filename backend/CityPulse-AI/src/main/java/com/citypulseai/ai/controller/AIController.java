package com.citypulseai.ai.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;

import com.citypulseai.ai.dto.AIAnalysisResponse;
import com.citypulseai.ai.service.AIService;
import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AIController {
	
	private final AIService aiService;

	// No @PreAuthorize here: access is enforced per-complaint inside
	// AIService.getAnalysisByComplaintId (Citizen/Officer/Manager are
	// scoped to their own/assigned/department complaints, Admin sees all),
	// same pattern as ComplaintController.getComplaintById.
	@GetMapping("/complaints/{complaintId}")
	public ResponseEntity<ApiResponse<AIAnalysisResponse>> getAIAnalysis(
	        @PathVariable String complaintId) {

	    AIAnalysisResponse response = aiService.getAnalysisByComplaintId(complaintId);

	    return ResponseEntity.ok(
	            ApiResponse.<AIAnalysisResponse>builder()
	                    .success(true)
	                    .message(AppConstants.AI_RESPONSE_GENERATED_SUCCESSFULLY)
	                    .data(response)
	                    .build()
	    );
	}
    
    // Not called by the frontend today — this is the manual-retry path for
    // a complaint whose automatic AI analysis failed (see AIServiceImpl's
    // admin-notification-on-failure). Restricted to Admin since it has no
    // ownership/department scoping of its own.
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/complaints/{complaintId}/analyze")
    public ResponseEntity<ApiResponse<Void>> analyzeComplaint(
            @PathVariable String complaintId) {

        aiService.analyzeComplaint(complaintId);

        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(ApiResponse.<Void>builder()
                        .success(true)
                        .message(AppConstants.AI_ANALYSIS_STARTED_SUCCESSFULLY)
                        .data(null)
                        .build());
    }

}