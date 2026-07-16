package com.citypulseai.ai.controller;

import java.net.URI;

import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.content.Media;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

/**
 * NOTE: this looks like a leftover manual-testing endpoint (path is
 * literally "/ai/test") — it is not called anywhere in the frontend and
 * isn't part of any documented workflow. Previously it had no access
 * restriction beyond "any authenticated user," which meant any Citizen
 * could hit it with an arbitrary imageUrl and consume the project's paid
 * Google GenAI quota with no rate limiting. Locked to Admin-only as a
 * minimum safeguard; recommend removing this controller entirely before
 * a real deployment if it's no longer needed for manual testing.
 */
@RestController
@RequestMapping("/api/v1/ai/test")
@RequiredArgsConstructor
public class AITestController {

    private final ChatModel chatModel;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/image")
    public ResponseEntity<String> analyzeImage(
            @RequestParam String imageUrl) {

        String prompt = """
                Analyze ONLY the attached image.

                Ignore any assumptions.

                Answer the following:

                1. Describe everything visible.
                2. What objects do you see?
                3. Is there any civic issue?
                4. Which civic issue?
                5. Explain why.
                6. Confidence Score (0-100)

                If the image cannot be analysed,
                explicitly say:

                "I cannot analyse the attached image."

                Do not return markdown.
                """;

        Media image = Media.builder()
                .mimeType(Media.Format.IMAGE_JPEG)
                .data(URI.create(imageUrl))
                .build();

        UserMessage userMessage = UserMessage.builder()
                .text(prompt)
                .media(image)
                .build();

        Prompt aiPrompt = new Prompt(userMessage);

        String response = chatModel.call(aiPrompt)
                .getResult()
                .getOutput()
                .getText();

        return ResponseEntity.ok(response);
    }
}