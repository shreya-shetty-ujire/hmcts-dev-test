package uk.gov.hmcts.reform.dev.Exception;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import uk.gov.hmcts.reform.dev.Service.TaskService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);

    Map <String, String> errorResponse = new HashMap <>();

    @ExceptionHandler(TaskException.class)
    public ResponseEntity <ErrorDetails> handleUserAlreadyExistsException(TaskException ex, WebRequest request) {
        ErrorDetails error = new ErrorDetails(ex.getMessage(), request.getDescription(false), LocalDateTime.now());
        return new ResponseEntity <>(error, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity <ErrorDetails> handleTaskNotFoundException(TaskNotFoundException ex, WebRequest request) {
        ErrorDetails error = new ErrorDetails(ex.getMessage(), request.getDescription(false), LocalDateTime.now());
        return new ResponseEntity <>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleGeneralException(Exception ex, WebRequest request) {
        ErrorDetails error = new ErrorDetails(ex.getMessage(), request.getDescription(false), LocalDateTime.now());
        return new ResponseEntity<>(error , HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorDetails> handleValidationException(ConstraintViolationException ex, WebRequest request) {
        logger.error("Validation error: " + ex.getMessage());
        
        ErrorDetails error = new ErrorDetails(ex.getMessage(),request.getDescription(false),
                                              LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetails> handleValidationException(MethodArgumentNotValidException ex, WebRequest request) {
        logger.error("Validation error: " + ex.getMessage());

        String errorMessage = "Validation error";

        for ( FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            if ("due".equals(fieldError.getField())) {
                errorMessage = "Due date must be today or in the future.";
            }else if ("title".equals(fieldError.getField())) {
                errorMessage = "Title cannot be null or empty"; 
        }

        ErrorDetails error = new ErrorDetails(errorMessage, request.getDescription(false), LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(InvalidFormatException.class)
    public ResponseEntity<ErrorDetails> handleInvalidDateFormat(InvalidFormatException ex, WebRequest request) {
        ErrorDetails error = new ErrorDetails(ex.getMessage(),request.getDescription(false),
                                              LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
