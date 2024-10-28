package com.kaizenflow.techtales.controller;

import com.kaizenflow.techtales.dto.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalControllerExceptionHandler {

  @ExceptionHandler(Exception.class)
  protected ResponseEntity<ApiError> handleEntityNotFound(Exception ex) {
    ApiError apiError = new ApiError();
    apiError.setStatus(HttpStatus.BAD_REQUEST);
    apiError.setMessage("UNCAUGHT ERROR");
    // getLocalizedMessage() gets the error message in the locale language
    apiError.setDebugMessage(ex.getLocalizedMessage());
    return new ResponseEntity<>(apiError, apiError.getStatus());
  }

  private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
    return new ResponseEntity<>(apiError, apiError.getStatus());
  }
}
