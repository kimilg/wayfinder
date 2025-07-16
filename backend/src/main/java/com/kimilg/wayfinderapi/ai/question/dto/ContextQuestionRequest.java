/**
 * 파일명: ContextQuestionRequest.java
 * 목적: 문맥 기반 질문 생성을 위한 요청 DTO
 * 역할: 사용자가 쓴 내용을 AI에게 전달하는 데이터 구조
 * 작성일: 2024-12-19
 */

package com.kimilg.wayfinderapi.ai.question.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * ContextQuestionRequest: 문맥 기반 질문 생성 요청 DTO
 * @author Ilgoo.Kim
 */
public record ContextQuestionRequest(
    @NotBlank String content
) {
} 