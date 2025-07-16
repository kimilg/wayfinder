/**
 * 파일명: AiContextQuestionController.java
 * 목적: 문맥 기반 질문 생성 API 엔드포인트 제공
 * 역할: 프론트엔드에서 사용자 내용을 바탕으로 문맥 기반 질문을 요청할 수 있는 REST API
 * 작성일: 2024-12-19
 */

package com.kimilg.wayfinderapi.ai.question.context;

import com.kimilg.wayfinderapi.ai.question.dto.ContextQuestionRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * AiContextQuestionController: 문맥 기반 질문 생성 컨트롤러
 * @author Ilgoo.Kim
 */
@RequiredArgsConstructor
@RestController
public class AiContextQuestionController {
    private final AiContextQuestionService aiContextQuestionService;
    
    /**
     * generateContextQuestion: 문맥 기반 질문 생성 API
     * @param {ContextQuestionRequest} request - 사용자가 쓴 내용
     * @return {String} 생성된 문맥 기반 질문
     */
    @PostMapping("/ai/context-question")
    public String generateContextQuestion(
        @Valid @RequestBody ContextQuestionRequest request
    ) {
        return aiContextQuestionService.generateContextQuestion(request.content());
    }
} 