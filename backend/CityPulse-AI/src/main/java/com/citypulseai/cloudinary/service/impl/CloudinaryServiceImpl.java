package com.citypulseai.cloudinary.service.impl;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.citypulseai.cloudinary.service.CloudinaryService;
import com.cloudinary.Cloudinary;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {
	
	private final Cloudinary cloudinary;

	@Override
	public String uploadImage(MultipartFile image) {

	    try {

	        // Configure how the image should be uploaded to Cloudinary.
	        Map<String, Object> uploadOptions = Map.of(
	                "folder", "citypulse/complaints",
	                "resource_type", "image");

	        // Upload the image and receive the upload details.
	        Map<?, ?> uploadResult = cloudinary.uploader()
	                .upload(image.getBytes(), uploadOptions);

	        // Return the secure HTTPS URL of the uploaded image.
	        return uploadResult.get("secure_url").toString();

	    } catch (IOException exception) {

	        // Image upload failed.
	        throw new RuntimeException("Failed to upload image to Cloudinary.", exception);
	    }
	}

}
