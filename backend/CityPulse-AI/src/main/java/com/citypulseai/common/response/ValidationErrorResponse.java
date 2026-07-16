package com.citypulseai.common.response;

import java.time.LocalDateTime;
import java.util.List;

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
public class ValidationErrorResponse {

	private boolean success;
	
	private String message;
	
	private List<ValidationError> errors;
	
	@Builder.Default
	private LocalDateTime timestamp = LocalDateTime.now();
}
