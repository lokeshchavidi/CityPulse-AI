package com.citypulseai.ai.provider;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.content.Media;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.stereotype.Component;

import com.citypulseai.ai.config.AIProperties;
import com.citypulseai.ai.dto.AIAnalysisRequest;
import com.citypulseai.ai.dto.AIAnalysisResponse;
import com.citypulseai.ai.exception.AIAnalysisException;
import com.citypulseai.ai.prompt.AIPromptFactory;
import com.citypulseai.ai.util.ImageMimeTypeUtil;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GeminiAIProvider implements AIProvider {

	private static final Logger log = LoggerFactory.getLogger(GeminiAIProvider.class);

	private final ChatModel chatModel;

	private final AIPromptFactory promptFactory;

	private final AIProperties aiProperties;
	
	@Override
	public AIAnalysisResponse analyzeComplaint(AIAnalysisRequest request) {

		log.info("Starting AI analysis for complaint : {}", request.getComplaintId());

		validateRequest(request);

		BeanOutputConverter<AIAnalysisResponse> converter = createConverter();

		Prompt prompt = buildPrompt(request, converter);

		ChatResponse response = invokeGemini(prompt);

		AIAnalysisResponse aiResponse = parseResponse(response, converter);

		log.info("AI analysis completed successfully for complaint : {}", request.getComplaintId());

		return aiResponse;
	}

	private void validateRequest(AIAnalysisRequest request) {

		if (request == null) {
			throw new AIAnalysisException("AI analysis request cannot be null.");
		}

		if (request.getTitle() == null || request.getTitle().isBlank()) {
			throw new AIAnalysisException("Complaint title cannot be empty.");
		}

		if (request.getDescription() == null || request.getDescription().isBlank()) {
			throw new AIAnalysisException("Complaint description cannot be empty.");
		}

		if (request.getImageUrl() == null || request.getImageUrl().isBlank()) {
			throw new AIAnalysisException("Complaint image URL cannot be empty.");
		}

	}

	private BeanOutputConverter<AIAnalysisResponse> createConverter() {
		return new BeanOutputConverter<>(AIAnalysisResponse.class);
	}

	private Prompt buildPrompt(AIAnalysisRequest request, BeanOutputConverter<AIAnalysisResponse> converter) {

		String businessPrompt = promptFactory.buildPrompt(request);

		String finalPrompt = businessPrompt + System.lineSeparator() + System.lineSeparator() + converter.getFormat();
		
		Media image = Media.builder()
		        .mimeType(ImageMimeTypeUtil.getMediaFormat(request.getImageUrl()))
		        .data(URI.create(request.getImageUrl()))
		        .build();

		UserMessage userMessage = UserMessage
				.builder()
				.text(finalPrompt)
				.media(image)
				.build();

		return new Prompt(userMessage);
	}

	private ChatResponse invokeGemini(Prompt prompt) {

		int maxAttempts = resolveMaxAttempts();

		Exception lastFailure = null;

		for (int attempt = 1; attempt <= maxAttempts; attempt++) {

			try {

				log.info("Sending complaint to Gemini for AI analysis (attempt {} of {}).",
						attempt, maxAttempts);

				ChatResponse response = chatModel.call(prompt);

				log.info("Received AI response from Gemini.");

				return response;

			} catch (Exception ex) {

				lastFailure = ex;

				log.warn("Gemini call failed on attempt {} of {}: {}",
						attempt, maxAttempts, ex.getMessage());

				if (attempt < maxAttempts) {
					sleepBeforeRetry(attempt);
				}
			}
		}

		log.error("Gemini call failed after {} attempt(s).", maxAttempts, lastFailure);

		throw new AIAnalysisException("Failed to analyze complaint using AI.", lastFailure);
	}

	/**
	 * citypulse.ai.max-retry-attempts was already configured in
	 * application.properties, but nothing in the codebase ever read it —
	 * a single transient Gemini failure (rate limit, momentary network
	 * blip, brief upstream 5xx) permanently failed that complaint's
	 * analysis with zero retry. The longer the backend runs and the more
	 * complaints it processes, the more likely it is to eventually hit
	 * one of these transient failures at least once, which matches
	 * "works at first, intermittently stops working over time."
	 */
	private int resolveMaxAttempts() {

		Integer configured = aiProperties.getMaxRetryAttempts();

		return (configured != null && configured > 0) ? configured : 1;
	}

	private void sleepBeforeRetry(int attempt) {

		try {
			// Simple exponential backoff: 1s, 2s, 4s, ...
			long delayMs = 1000L * (1L << (attempt - 1));

			Thread.sleep(delayMs);

		} catch (InterruptedException interruptedEx) {

			Thread.currentThread().interrupt();
		}
	}

	private AIAnalysisResponse parseResponse(ChatResponse response, BeanOutputConverter<AIAnalysisResponse> converter) {

		if (response == null || response.getResult() == null) {
			throw new AIAnalysisException("Gemini returned an empty response.");
		}

		String aiResponse = response.getResult().getOutput().getText();

		log.debug("Raw AI Response: {}", aiResponse);

		try {

			return converter.convert(aiResponse);

		} catch (Exception ex) {

			log.error("Failed to parse Gemini response.", ex);

			throw new AIAnalysisException("Unable to parse AI response.", ex);
		}
	}

}