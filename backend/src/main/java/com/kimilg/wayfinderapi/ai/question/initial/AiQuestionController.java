/**
 * 파일명: AiQuestionController.java
 * 목적: AI 질문 생성 API 엔드포인트 제공
 * 역할: 프론트엔드에서 AI 질문을 요청할 수 있는 REST API
 * 작성일: 2024-12-19
 */

package com.kimilg.wayfinderapi.ai.question.initial;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * AiQuestionController: AI 질문 생성 컨트롤러
 * @author Ilgoo.Kim
 */
@RequiredArgsConstructor
@RestController
public class AiQuestionController {
    private final AiQuestionService aiQuestionService;
    
    /**
     * generateQuestion: AI 질문 생성 API
     * @return {String} 생성된 질문
     */
    @GetMapping("/ai/question")
    public String generateQuestion() {
        return aiQuestionService.generateQuestion();
    }
} 