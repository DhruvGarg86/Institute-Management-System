package com.institute.exception;

import com.institute.dto.ApiResponse;
import com.institute.exception.customexceptions.ApiException;
import com.institute.exception.customexceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class GlobalExceptionHandler {
    // add exc handling method
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<?> handleApiException(ApiException e) {
        System.out.println("in handle api exc");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(e.getMessage()));
    }
    // add exc handling method
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
        System.out.println("in handle res not found exc");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
    }
    // equivalent to catch-all
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        System.out.println("in catch all exc " + e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
    }
}
