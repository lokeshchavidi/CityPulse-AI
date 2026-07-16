package com.citypulseai.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI cityPulseOpenAPI() {

        final String securitySchemeName = "Bearer Authentication";

        return new OpenAPI()

                .info(new Info()

                        .title("CityPulse AI API")

                        .version("1.0.0")

                        .description("""
                                AI-Powered Smart City Complaint Management Platform

                                Features:
                                • JWT Authentication
                                • Complaint Management
                                • AI-Based Complaint Analysis
                                • Officer Management
                                • Department Management
                                • Admin Dashboard
                                """)

                        .contact(new Contact()

                                .name("CityPulse AI Team")

                                .email("support@citypulse.ai")

                                .url("https://citypulse.ai"))

                        .license(new License()

                                .name("MIT License")

                                .url("https://opensource.org/licenses/MIT")))

                // JWT Security Scheme
                .addSecurityItem(
                        new SecurityRequirement()
                                .addList(securitySchemeName))

                .schemaRequirement(
                        securitySchemeName,

                        new SecurityScheme()

                                .name(securitySchemeName)

                                .type(SecurityScheme.Type.HTTP)

                                .scheme("bearer")

                                .bearerFormat("JWT")

                                .in(SecurityScheme.In.HEADER)

                                .name("Authorization"));
    }

}