package com.citypulseai.user.util;

import javax.crypto.SecretKey;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Encoders;

public class JwtSecretKeyGenerator {

    public static void main(String[] args) {

    	SecretKey secretKey = Jwts.SIG.HS256.key().build();

        String base64Secret = Encoders.BASE64.encode(secretKey.getEncoded());

        System.out.println("JWT Secret:");
        System.out.println(base64Secret);
        
        
    }
}