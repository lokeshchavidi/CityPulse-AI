package com.citypulseai.ai.exception;

public class ImageDownloadException extends RuntimeException {

	public ImageDownloadException(String message, Exception ex) {
		super(message, ex);
	}
	
	public ImageDownloadException(String message) {
		super(message);
	}
	
}
