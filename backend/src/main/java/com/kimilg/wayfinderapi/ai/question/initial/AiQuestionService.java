/**
 * 파일명: AiQuestionService.java
 * 목적: AI가 사용자에게 질문을 생성하는 서비스
 * 역할: 사용자가 글을 많이 쓸 수 있도록 도와주는 질문 생성
 * 작성일: 2024-12-19
 */

package com.kimilg.wayfinderapi.ai.question.initial;

import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * AiQuestionService: AI 질문 생성 서비스
 * @author Ilgoo.Kim
 */
@RequiredArgsConstructor
@Service
public class AiQuestionService {
    private final WebClient openAiWebClient;
    
    /**
     * generateQuestion: 사용자가 글을 많이 쓸 수 있도록 도와주는 질문 생성
     * @return {String} 생성된 질문
     */
    public String generateQuestion() {
        Map<String, Object> systemMessage = Map.of(
            "role", "system",
            "content", "당신은 사용자가 글을 많이 쓸 수 있도록 도와주는 친근한 AI입니다. 사용자가 하루를 돌아보고 자신의 생각과 감정을 자세히 표현할 수 있도록 하는 질문을 생성하세요. 질문은 친근하고 따뜻한 톤으로, 구체적이고 개방적인 질문이어야 합니다. 예시: '오늘 어떤 일이 있었어?', '오늘 가장 기억에 남는 순간은 언제였어?', '오늘 느낀 감정 중에서 가장 강했던 것은 무엇이었어?'"
        );

        Map<String, Object> userMessage = Map.of(
            "role", "user",
            "content", "사용자가 글을 많이 쓸 수 있도록 도와주는 질문을 하나만 생성해줘."
        );

        Map<String, Object> requestBody = Map.of(
            "model", "gpt-3.5-turbo",
            "messages", List.of(systemMessage, userMessage),
            "temperature", 0.8
        );
        
        return openAiWebClient.post()
            .uri("/chat/completions")
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
            .map(this::extractContent)
            .block();
    }
    
    /**
     * extractContent: OpenAI 응답에서 질문 내용 추출
     * @param {Map<String, Object>} response - OpenAI API 응답
     * @return {String} 추출된 질문 내용
     */
    private String extractContent(Map<String, Object> response) {
        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
        return (String) message.get("content");
    }
} 