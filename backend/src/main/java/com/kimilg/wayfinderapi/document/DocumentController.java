package com.kimilg.wayfinderapi.document;

import com.kimilg.wayfinderapi.common.dto.PageResponse;
import com.kimilg.wayfinderapi.document.dto.HtmlRequest;
import com.kimilg.wayfinderapi.document.dto.HtmlResponse;
import com.kimilg.wayfinderapi.document.dto.SaveHtmlRequest;
import com.kimilg.wayfinderapi.document.dto.SaveHtmlResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Ilgoo.Kim
 */
@RequiredArgsConstructor
@RestController
public class DocumentController {
    private final DocumentService documentService;
    
    @GetMapping(value = "/document/html", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResponse<HtmlResponse> getAll(Pageable pageable) {
        return documentService.getAll(pageable);
    }
    
    @PostMapping("/document/html")
    public SaveHtmlResponse save(
        @Valid @RequestBody SaveHtmlRequest request
    ) {
        return documentService.save(request);
    }

    @GetMapping("/document/html/by-tags")
    public PageResponse<HtmlResponse> getByTags(
        @Valid @RequestParam HtmlRequest request,
        Pageable pageable
    ) {
        return documentService.getByTags(request, pageable);
    }
}
