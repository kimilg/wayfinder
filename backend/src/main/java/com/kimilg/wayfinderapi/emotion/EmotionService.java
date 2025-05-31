/**
 * @(#)EmotionService.java 2025. 05. 31
 * <p>
 * Copyright 2025 Naver Corp. All rights Reserved. Naver PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.kimilg.wayfinderapi.emotion;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kimilg.wayfinderapi.emotion.entity.EmotionRequest;
import com.kimilg.wayfinderapi.emotion.entity.EmotionResponse;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * @author Ilgoo.Kim
 */
@RequiredArgsConstructor
@Service
public class EmotionService {
    private final WebClient openAiWebClient;
    
    public EmotionResponse extractTags(EmotionRequest request) {
        String userInput = request.getText();
        
        Map<String, Object> systemMessage = Map.of(
            "role", "system",
            "content", "당신은 감정 분석 전문가입니다. 사용자의 문장에서 감정을 분석하여 태그 목록을 JSON 배열 형식으로 반환하세요. 예: [\"happy\", \"sad\"]"
        );

        Map<String, Object> userMessage = Map.of(
            "role", "user",
            "content", userInput
        );

        Map<String, Object> requestBody = Map.of(
            "model", "gpt-3.5-turbo",
            "messages", List.of(systemMessage, userMessage),
            "temperature", 0.7
        );
        
        return openAiWebClient.post()
            .uri("/chat/completions")
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
            .map(this::toResponse)
            .block();
    }
    
    private EmotionResponse toResponse(Map<String, Object> response) {
        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
        String content = (String) message.get("content");
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            List<String> tags = objectMapper.readValue(content, new TypeReference<>() {});
            return new EmotionResponse(tags);
        } catch(JsonProcessingException e) {
            throw new RuntimeException("Failed to parse response content: " + content, e);
        }
    }
}
