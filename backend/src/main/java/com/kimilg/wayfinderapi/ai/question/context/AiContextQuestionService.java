/**
 * 파일명: AiContextQuestionService.java
 * 목적: 사용자가 쓴 내용을 바탕으로 문맥에 맞는 질문을 생성하는 서비스
 * 역할: 사용자가 최대한 많은 글을 쓰도록 도와주는 문맥 기반 질문 생성
 * 작성일: 2024-12-19
 */

package com.kimilg.wayfinderapi.ai.question.context;

import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * AiContextQuestionService: 문맥 기반 AI 질문 생성 서비스
 * @author Ilgoo.Kim
 */
@RequiredArgsConstructor
@Service
public class AiContextQuestionService {
    private final WebClient openAiWebClient;
    
    /**
     * generateContextQuestion: 사용자가 쓴 내용을 바탕으로 문맥에 맞는 질문 생성
     * @param {String} userContent - 사용자가 쓴 HTML 내용
     * @return {String} 생성된 문맥 기반 질문
     */
    public String generateContextQuestion(String userContent) {
        Map<String, Object> systemMessage = Map.of(
            "role", "system",
            "content", "당신은 사용자가 글을 많이 쓸 수 있도록 도와주는 친근한 AI입니다. 사용자가 쓴 내용을 분석하고, 그 내용을 바탕으로 더 깊이 있게 탐구할 수 있는 질문을 생성하세요. 질문은 사용자가 더 많은 생각과 감정을 표현할 수 있도록 구체적이고 개방적이어야 합니다. 예시: '그 상황에서 어떤 감정을 느꼈어?', '그 경험이 당신에게 어떤 영향을 미쳤어?', '그때 다른 사람들은 어떻게 반응했어?'"
        );

        Map<String, Object> userMessage = Map.of(
            "role", "user",
            "content", "사용자가 쓴 내용: " + userContent + "\n\n이 내용을 바탕으로 사용자가 더 많은 글을 쓸 수 있도록 도와주는 질문을 하나만 생성해줘."
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