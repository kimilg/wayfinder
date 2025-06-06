package com.kimilg.wayfinderapi.emotion.entity;

import com.kimilg.wayfinderapi.document.entity.HtmlDocument;
import com.kimilg.wayfinderapi.emotion.repository.EmotionTagRepository;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author Ilgoo.Kim
 */
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class EmotionTag {
    @Id @GeneratedValue
    private Long id;
    @Getter
    @Column(unique = true, nullable = false)
    private String name;
    @ManyToMany(mappedBy = "emotionTags")
    private List<HtmlDocument> htmlDocuments = new ArrayList<>();
    
    public EmotionTag(String name) {
        this.name = name;
    }
}
