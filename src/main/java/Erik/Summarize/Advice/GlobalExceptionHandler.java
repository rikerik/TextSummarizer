package Erik.Summarize.Advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import Erik.Summarize.Exception.HttpRequestException;
import Erik.Summarize.Exception.JsonConversionException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(JsonConversionException.class)
    public ResponseEntity<String> handleJsonConversionException(JsonConversionException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(HttpRequestException.class)
    public ResponseEntity<String> handleHttpRequestException(HttpRequestException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
    }

}
