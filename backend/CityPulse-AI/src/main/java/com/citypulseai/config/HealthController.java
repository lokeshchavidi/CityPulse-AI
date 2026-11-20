package com.citypulseai.config;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Public path for Render's health check. The rest of the API requires a JWT,
 * so a check against "/" comes back 401 and Render treats the deploy as failed.
 */
@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }
}
