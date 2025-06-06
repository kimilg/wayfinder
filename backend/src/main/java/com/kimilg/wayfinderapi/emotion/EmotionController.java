package com.kimilg.wayfinderapi.emotion;

import com.kimilg.wayfinderapi.emotion.dto.EmotionRequest;
import com.kimilg.wayfinderapi.emotion.dto.EmotionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Ilgoo.Kim
 */
@RequiredArgsConstructor
@RestController
public class EmotionController {
    private final EmotionService emotionService;
    
    @PostMapping("/tags")
    public EmotionResponse extractTags(
        @RequestBody EmotionRequest request
    ) {
        EmotionResponse response = emotionService.extractTags(request); 
        return response;
    }
}
