package Erik.Summarize.Service;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SummaryService {
    public String extractText(String text) {

        log.debug("text returned: " + text);
        return text;
    }

}
