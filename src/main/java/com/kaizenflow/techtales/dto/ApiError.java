package com.kaizenflow.techtales.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Setter
@Getter
@NoArgsConstructor
public class ApiError {
  private HttpStatus status;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
  private LocalDateTime timestamp;

  private String message;
  private String debugMessage;
  private List<FieldError> fieldErrors;

  public ApiError(HttpStatus status) {
    this.timestamp = LocalDateTime.now();
    this.status = status;
  }

  public ApiError(HttpStatus status, String message) {
    this(status);
    this.message = message;
  }

  public ApiError(HttpStatus status, String message, Throwable ex) {
    this(status);
    this.message = message;
    this.debugMessage = ex.getLocalizedMessage();
  }

  public void addFieldError(String object, String field, Object rejectedValue, String message) {
    if (fieldErrors == null) {
      fieldErrors = new ArrayList<>();
    }
    fieldErrors.add(new FieldError(object, field, rejectedValue, message));
  }

  @Getter
  @RequiredArgsConstructor
  public static class FieldError {
    private final String object;
    private final String field;
    private final Object rejectedValue;
    private final String message;
  }
}
