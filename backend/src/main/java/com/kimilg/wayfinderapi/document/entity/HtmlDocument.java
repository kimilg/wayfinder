package com.kimilg.wayfinderapi.document.entity;

import com.kimilg.wayfinderapi.emotion.entity.EmotionTag;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Ilgoo.Kim
 */
@Setter
@Entity
public class HtmlDocument {
    @Getter
    @Id @GeneratedValue
    private Long id;
    @Getter
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    @Getter
    @ManyToMany
    @JoinTable(
        name = "html_document_emotion_tag",
        joinColumns = @JoinColumn(name = "html_document_id"),
        inverseJoinColumns = @JoinColumn(name = "emotion_tag_id")
    )
    private List<EmotionTag> emotionTags = new ArrayList<>();
}
