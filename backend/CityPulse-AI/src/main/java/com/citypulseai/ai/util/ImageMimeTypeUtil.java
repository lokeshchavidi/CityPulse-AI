package com.citypulseai.ai.util;

import org.springframework.ai.content.Media;
import org.springframework.util.MimeType;

public final class ImageMimeTypeUtil {

    private ImageMimeTypeUtil() {
    }

    public static MimeType getMediaFormat(String imageUrl) {

        if (imageUrl == null) {
            return Media.Format.IMAGE_JPEG;
        }

        String url = imageUrl.toLowerCase();

        if (url.endsWith(".png")) {
            return Media.Format.IMAGE_PNG;
        }

        if (url.endsWith(".webp")) {
            return Media.Format.IMAGE_WEBP;
        }

        if (url.endsWith(".gif")) {
            return Media.Format.IMAGE_GIF;
        }

        if (url.endsWith(".jpeg") || url.endsWith(".jpg")) {
            return Media.Format.IMAGE_JPEG;
        }

        return Media.Format.IMAGE_JPEG;
    }

}