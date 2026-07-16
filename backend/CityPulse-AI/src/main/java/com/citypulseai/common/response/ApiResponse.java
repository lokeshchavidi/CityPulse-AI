package com.citypulseai.common.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse<T> {

	private boolean success;
	
	private String message;
	
	private T data;
	
	@Builder.Default
	private LocalDateTime timestamp = LocalDateTime.now();
}
