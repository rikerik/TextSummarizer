package Erik.Summarize.Service;

import java.util.Map;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SummaryService {
    private final RestTemplate restTemplate;
    private final String aiModelUrl;

    // TODO better exception handling

    public SummaryService(RestTemplate restTemplate, @Value("${ai.model.url}") String aiModelUrl) {
        this.restTemplate = restTemplate;
        this.aiModelUrl = aiModelUrl;
    }

    public String extractText(String text) {
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        // set the header to accept json

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody;
        try {
            // Convert text into JSON format
            requestBody = objectMapper.writeValueAsString(Map.of("text", text));
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Failed to convert text to JSON: " + e.getMessage(), e);
        }

        log.info("Sending request to URL: ", aiModelUrl);
        log.debug("Request Body: ", requestBody);

        // HTTP request entity with the json formatted request body and header
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, header);

        // post request to the python script, using RestTemplate
        ResponseEntity<String> responseEntity = restTemplate.exchange(aiModelUrl, HttpMethod.POST, requestEntity,
                String.class);
        log.debug("Response Status Code: ", responseEntity.getStatusCode());
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return responseEntity.getBody();
        } else {
            log.error("Failed to get summarized text! Status code: {}", responseEntity.getStatusCode());
            throw new RuntimeException(
                    "Failed to get summarized text! Status code: " + responseEntity.getStatusCode());
        }
    }
}
