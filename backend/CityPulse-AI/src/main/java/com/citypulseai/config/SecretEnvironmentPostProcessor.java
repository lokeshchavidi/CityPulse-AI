package com.citypulseai.config;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

/**
 * Maps raw process environment variables onto Spring property names before
 * placeholder resolution runs.
 *
 * <p>
 * Render (and similar hosts) often get a value pasted as
 * {@code ${GOOGLE_GENAI_API_KEY}}. Binding
 * {@code spring.ai.google.genai.api-key=${GOOGLE_GENAI_API_KEY}} then resolves
 * that name back to the same text and fails with a circular placeholder error.
 * Reading {@link System#getenv(String)} and publishing the value as a
 * first-class property avoids that loop. Values that still look like
 * {@code ${...}} are rejected with a clear startup message.
 */
public class SecretEnvironmentPostProcessor implements EnvironmentPostProcessor, Ordered {

	private static final String SOURCE_NAME = "citypulseSecretEnvironment";

	@Override
	public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
		Map<String, Object> mapped = new LinkedHashMap<>();

		// Only set Gemini if Spring has not already received a key via
		// SPRING_AI_GOOGLE_GENAI_API_KEY (relaxed binding).
		if (!hasText(environment.getProperty("spring.ai.google.genai.api-key"))) {
			copyEnv(mapped, "GOOGLE_GENAI_API_KEY", "spring.ai.google.genai.api-key");
			copyEnv(mapped, "GEMINI_API_KEY", "spring.ai.google.genai.api-key");
			copyEnv(mapped, "GOOGLE_API_KEY", "spring.ai.google.genai.api-key");
		}

		copyEnv(mapped, "JWT_SECRET", "jwt.secret");
		copyEnv(mapped, "CLOUDINARY_CLOUD_NAME", "cloudinary.cloud-name");
		copyEnv(mapped, "CLOUDINARY_API_KEY", "cloudinary.api-key");
		copyEnv(mapped, "CLOUDINARY_API_SECRET", "cloudinary.api-secret");

		if (!mapped.isEmpty()) {
			environment.getPropertySources().addFirst(new MapPropertySource(SOURCE_NAME, mapped));
		}
	}

	private static boolean hasText(String value) {
		return value != null && !value.isBlank() && !value.startsWith("${");
	}

	private static void copyEnv(Map<String, Object> target, String envName, String propertyName) {
		if (target.containsKey(propertyName)) {
			return;
		}

		String value = System.getenv(envName);
		if (value == null || value.isBlank()) {
			return;
		}

		String trimmed = value.trim();
		if (trimmed.startsWith("${") && trimmed.endsWith("}")) {
			throw new IllegalStateException(
					"Environment variable '" + envName + "' is set to '" + trimmed + "'. "
							+ "On Render, the Value field must be the real secret, not " + trimmed + ".");
		}

		target.put(propertyName, trimmed);
	}

	@Override
	public int getOrder() {
		return Ordered.HIGHEST_PRECEDENCE + 10;
	}
}
