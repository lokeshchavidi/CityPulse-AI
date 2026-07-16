package com.citypulseai.cloudinary.service;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

	/**
     * Uploads an image to Cloudinary and returns its secure URL.
     *
     * @param image Image to upload
     * @return Secure Cloudinary URL
     */
    String uploadImage(MultipartFile image);
}
