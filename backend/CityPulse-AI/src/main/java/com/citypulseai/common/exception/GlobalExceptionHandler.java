package com.citypulseai.common.exception;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.citypulseai.admin.exception.InvalidUserOperationException;
import com.citypulseai.ai.exception.AIAnalysisException;
import com.citypulseai.authentication.exception.PortalAccessDeniedException;
import com.citypulseai.cloudinary.exception.ImageUploadException;
import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.common.response.ErrorResponse;
import com.citypulseai.common.response.ValidationError;
import com.citypulseai.common.response.ValidationErrorResponse;
import com.citypulseai.complaint.exception.ComplaintNotFoundException;
import com.citypulseai.complaint.exception.DepartmentNotAssignedException;
import com.citypulseai.complaint.exception.InvalidOfficerException;
import com.citypulseai.complaint.exception.UnauthorizedComplaintAccessException;
import com.citypulseai.department.exception.DepartmentNotFoundException;
import com.citypulseai.department.exception.DepartmentAlreadyExistsException;
import com.citypulseai.departmentmanager.exception.InvalidComplaintStateException;
import com.citypulseai.notification.exception.NotificationNotFoundException;
import com.citypulseai.user.exception.DepartmentManagerAlreadyExistsException;
import com.citypulseai.user.exception.EmailAlreadyExistsException;
import com.citypulseai.user.exception.InvalidPasswordException;
import com.citypulseai.user.exception.UserNotFoundException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ValidationErrorResponse> handleMethodArgumentNotValidException(
			MethodArgumentNotValidException ex) {
		
		List<ValidationError> errors = ex.getBindingResult()
		.getFieldErrors()
		.stream()
		.map(error -> ValidationError.builder()
				.field(error.getField())
				.message(error.getDefaultMessage())
				.build())
		.toList();
		
		ValidationErrorResponse validationErrorResponse = ValidationErrorResponse.builder()
							.success(false)
							.message(AppConstants.VALIDATION_FAILED)
							.errors(errors)
							.build();
		
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(validationErrorResponse);
	}
	
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
		
		ErrorResponse errorResponse = ErrorResponse.builder()
		.timestamp(LocalDateTime.now())
		.success(false)
		.message(AppConstants.INVALID_CREDENTIALS)
		.build();
		
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(errorResponse);
	}
	
	@ExceptionHandler(DisabledException.class)
	public ResponseEntity<ErrorResponse> handleDisabledException(DisabledException ex) {

		ErrorResponse errorResponse = ErrorResponse.builder()
		.timestamp(LocalDateTime.now())
		.success(false)
		.message("This account has been disabled. Please contact your administrator.")
		.build();

		return ResponseEntity
				.status(HttpStatus.FORBIDDEN)
				.body(errorResponse);
	}

	@ExceptionHandler(PortalAccessDeniedException.class)
	public ResponseEntity<ErrorResponse> handlePortalAccessDeniedException(
			PortalAccessDeniedException ex) {
		
		ErrorResponse errorResponse = ErrorResponse.builder()
		.timestamp(LocalDateTime.now())
		.success(false)
		.message(ex.getMessage())
		.build();
		
		return ResponseEntity
				.status(HttpStatus.FORBIDDEN)
				.body(errorResponse);
	}
	
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ValidationErrorResponse> handleConstraintViolationException(ConstraintViolationException ex) {
		
		List<ValidationError> errors = ex.getConstraintViolations()
		.stream()
		.map(violation -> ValidationError.builder()
				.field(violation.getPropertyPath().toString())
				.message(violation.getMessage())
				.build())
		.toList();
		
		ValidationErrorResponse validationErrorResponse = ValidationErrorResponse.builder()
		.success(false)
		.message(AppConstants.VALIDATION_FAILED)
		.errors(errors)
		.build();
		
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(validationErrorResponse);
	}
	
	@ExceptionHandler(EmailAlreadyExistsException.class)
	public ResponseEntity<ErrorResponse> handleEmailAlreadyException(EmailAlreadyExistsException ex) {
		
		ErrorResponse errorResponse = ErrorResponse.builder()
			.success(false)
			.message(ex.getMessage())
			.timestamp(LocalDateTime.now())
			.build();
		
		return ResponseEntity
				.status(HttpStatus.CONFLICT)
				.body(errorResponse);
	}
	
	@ExceptionHandler(InvalidComplaintStateException.class)
	public ResponseEntity<ErrorResponse> handleInvalidComplaintStateException(
	        InvalidComplaintStateException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity
	            .status(HttpStatus.BAD_REQUEST)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(DepartmentManagerAlreadyExistsException.class)
	public ResponseEntity<ErrorResponse> handleDepartmentManagerAlreadyExistsException(
	        DepartmentManagerAlreadyExistsException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity
	            .status(HttpStatus.CONFLICT)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(ImageUploadException.class)
	public ResponseEntity<ErrorResponse> handleImageUploadException(ImageUploadException ex) {
		
		ErrorResponse errorResponse = ErrorResponse.builder()
			.success(false)
			.message(ex.getMessage())
			.timestamp(LocalDateTime.now())
			.build();
		
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(errorResponse);
	}
	
	@ExceptionHandler(InvalidPasswordException.class)
	public ResponseEntity<ErrorResponse> handleInvalidPasswordException(
	        InvalidPasswordException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity
	            .status(HttpStatus.BAD_REQUEST)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleUserNotFoundException(
	        UserNotFoundException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity.status(HttpStatus.NOT_FOUND)
	            .body(errorResponse);
	}

	@ExceptionHandler(InvalidOfficerException.class)
	public ResponseEntity<ErrorResponse> handleInvalidOfficerException(
	        InvalidOfficerException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(errorResponse);
	}

	@ExceptionHandler(DepartmentNotAssignedException.class)
	public ResponseEntity<ErrorResponse> handleDepartmentNotAssignedException(
	        DepartmentNotAssignedException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(errorResponse);
	}

	@ExceptionHandler(ComplaintNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleComplaintNotFoundException(
	        ComplaintNotFoundException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity.status(HttpStatus.NOT_FOUND)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(UnauthorizedComplaintAccessException.class)
	public ResponseEntity<ErrorResponse> handleUnauthorizedComplaintAccessException(
	        UnauthorizedComplaintAccessException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity.status(HttpStatus.FORBIDDEN)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(DepartmentNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleDepartmentNotFoundException(
	        DepartmentNotFoundException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity.status(HttpStatus.NOT_FOUND)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(DepartmentAlreadyExistsException.class)
	public ResponseEntity<ErrorResponse> handleDepartmentAlreadyExistsException(
	        DepartmentAlreadyExistsException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity.status(HttpStatus.CONFLICT)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(AIAnalysisException.class)
	public ResponseEntity<ErrorResponse> handleAIAnalysisException(
	        AIAnalysisException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(InvalidUserOperationException.class)
	public ResponseEntity<ErrorResponse> handleInvalidUserOperationException(
	        InvalidUserOperationException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity
	            .status(HttpStatus.BAD_REQUEST)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
	        IllegalArgumentException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(IllegalStateException.class)
	public ResponseEntity<ErrorResponse> handleIllegalStateException(
	        IllegalStateException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity.status(HttpStatus.CONFLICT)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ErrorResponse> handleAccessDeniedException(
	        AccessDeniedException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message("Access Denied.")
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity.status(HttpStatus.FORBIDDEN)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(
	        UsernameNotFoundException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity.status(HttpStatus.NOT_FOUND)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(NotificationNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleNotificationNotFoundException(
	        NotificationNotFoundException ex) {

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .success(false)
	            .message(ex.getMessage())
	            .timestamp(LocalDateTime.now())
	            .build();

	    return ResponseEntity
	            .status(HttpStatus.NOT_FOUND)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
		
		ex.printStackTrace();
		
		ErrorResponse errorResponse = ErrorResponse.builder()
		.success(false)
		.message(AppConstants.INTERNAL_SERVER_ERROR)
		.timestamp(LocalDateTime.now())
		.build();
		
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(errorResponse);
	}
}
