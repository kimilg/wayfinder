/**
 * @(#)DocumentService.java 2025. 06. 06
 * <p>
 * Copyright 2025 Naver Corp. All rights Reserved. Naver PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.kimilg.wayfinderapi.document;

import com.kimilg.wayfinderapi.common.dto.PageResponse;
import com.kimilg.wayfinderapi.document.dto.HtmlRequest;
import com.kimilg.wayfinderapi.document.dto.HtmlResponse;
import com.kimilg.wayfinderapi.document.dto.SaveHtmlRequest;
import com.kimilg.wayfinderapi.document.dto.SaveHtmlResponse;
import com.kimilg.wayfinderapi.document.entity.HtmlDocument;
import com.kimilg.wayfinderapi.document.repository.HtmlDocumentRepository;
import com.kimilg.wayfinderapi.emotion.entity.EmotionTag;
import com.kimilg.wayfinderapi.emotion.repository.EmotionTagRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @author Ilgoo.Kim
 */
@Service
@RequiredArgsConstructor
public class DocumentService {
    private final HtmlDocumentRepository htmlDocumentRepository;
    private final EmotionTagRepository emotionTagRepository;
    
    public PageResponse<HtmlResponse> get(HtmlRequest request, Pageable pageable) {
        List<String> tagNames = request.tagNames();
        Page<HtmlResponse> htmlResponsePage = htmlDocumentRepository.findByEmotionTags(tagNames, tagNames.size(), pageable)
            .map(HtmlResponse::from);
        return new PageResponse<>(htmlResponsePage);
    }
    
    public SaveHtmlResponse save(SaveHtmlRequest request) {
        List<EmotionTag> tags = request.tagNames().stream()
            .map(name -> emotionTagRepository.findByName(name)
                .orElseGet(() -> emotionTagRepository.save(new EmotionTag(name))))
            .collect(Collectors.toList());

        HtmlDocument doc = new HtmlDocument();
        doc.setContent(request.html());
        doc.setEmotionTags(tags);
        
        HtmlDocument savedDoc = htmlDocumentRepository.save(doc);
        return new SaveHtmlResponse(savedDoc.getId());
    }
}
