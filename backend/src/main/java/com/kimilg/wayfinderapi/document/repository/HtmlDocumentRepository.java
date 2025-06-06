package com.kimilg.wayfinderapi.document.repository;

import com.kimilg.wayfinderapi.document.entity.HtmlDocument;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * @author Ilgoo.Kim
 */
public interface HtmlDocumentRepository extends JpaRepository<HtmlDocument, Long> {
    List<HtmlDocument> findByEmotionTags_Name(String tagName);
    
    @Query(value = """
      SELECT d.*
      FROM html_document d
      JOIN html_document_emotion_tag hdet ON d.id = hdet.html_document_id
      JOIN emotion_tag t ON t.id = hdet.emotion_tag_id
      WHERE t.name IN (:tagNames)
      GROUP BY d.id
      HAVING COUNT(DISTINCT t.id) = :tagCount
    """, nativeQuery = true)
    List<HtmlDocument> findByEmotionTags(@Param("tagNames") List<String> tagNames,
        @Param("tagCount") long tagCount);
    
    Page<HtmlDocument> findByEmotionTags_Name(String tagName, Pageable pageable);
    
    @Query(value = """
      SELECT d.*
      FROM html_document d
      JOIN html_document_emotion_tag hdet ON d.id = hdet.html_document_id
      JOIN emotion_tag t ON t.id = hdet.emotion_tag_id
      WHERE t.name IN (:tagNames)
      GROUP BY d.id
      HAVING COUNT(DISTINCT t.id) = :tagCount
    """, nativeQuery = true)
    Page<HtmlDocument> findByEmotionTags(@Param("tagNames") List<String> tagNames,
        @Param("tagCount") long tagCount, Pageable pageable);
}
