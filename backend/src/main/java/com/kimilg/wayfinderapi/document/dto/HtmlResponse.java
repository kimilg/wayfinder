package com.kimilg.wayfinderapi.document.dto;

import com.kimilg.wayfinderapi.document.entity.HtmlDocument;
import com.kimilg.wayfinderapi.emotion.entity.EmotionTag;
import java.util.List;

/**
 * @author Ilgoo.Kim
 */
public record HtmlResponse(
    Long id,
    String title,
    List<String> emotionTagNames,
    String htmlContent
) {
    public static HtmlResponse from(HtmlDocument doc) {
        List<String> tagNames = doc.getEmotionTags().stream()
            .map(EmotionTag::getName)
            .toList();
        return new HtmlResponse(doc.getId(), doc.getTitle(), tagNames, doc.getContent());
    }
}
