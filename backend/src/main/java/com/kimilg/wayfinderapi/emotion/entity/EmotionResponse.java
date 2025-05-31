package com.kimilg.wayfinderapi.emotion.entity;

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
