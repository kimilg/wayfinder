package com.kimilg.wayfinderapi.ai.emotion.dto;

import java.util.List;
import org.springframework.util.CollectionUtils;

/**
 * @author Ilgoo.Kim
 */
public record EmotionResponse(
    List<String> tags
) {
    public EmotionResponse {
        if (CollectionUtils.isEmpty(tags)) {
            throw new IllegalArgumentException("Tags cannot be null or blank");
        }
    }

}
