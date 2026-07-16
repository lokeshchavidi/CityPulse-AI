package com.citypulseai.complaint.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateComplaintRequest {

    @NotBlank(message = "Title is required.")
    @Size(max = 150, message = "Title cannot exceed 150 characters.")
    private String title;

    @NotBlank(message = "Description is required.")
    @Size(max = 1000, message = "Description cannot exceed 1000 characters.")
    private String description;

    @NotNull(message = "Latitude is required.")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90.")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90.")
    private Double latitude;

    @NotNull(message = "Longitude is required.")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180.")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180.")
    private Double longitude;

    @NotBlank(message = "Address is required.")
    @Size(max = 300, message = "Address cannot exceed 300 characters.")
    private String address;
}