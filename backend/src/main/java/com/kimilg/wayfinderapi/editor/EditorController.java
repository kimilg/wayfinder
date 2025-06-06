package com.kimilg.wayfinderapi.editor;

import com.kimilg.wayfinderapi.editor.entity.SaveHtmlRequest;
import com.kimilg.wayfinderapi.editor.entity.SaveHtmlResponse;
import com.kimilg.wayfinderapi.emotion.entity.EmotionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Ilgoo.Kim
 */
@RequiredArgsConstructor
@RestController
public class EditorController {
    private final EditorService editorService;
    
    @PostMapping("/editor/html")
    public SaveHtmlResponse save(
        @RequestBody SaveHtmlRequest request
    ) {
        return editorService.save(request);
    }
}
