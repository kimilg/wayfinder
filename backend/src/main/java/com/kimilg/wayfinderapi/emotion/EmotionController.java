/**
 * @(#)EmotionController.java 2025. 05. 25
 * <p>
 * Copyright 2025 Naver Corp. All rights Reserved. Naver PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.kimilg.wayfinderapi.emotion;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kimilg.wayfinderapi.emotion.entity.EmotionRequest;
import com.kimilg.wayfinderapi.emotion.entity.EmotionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
