package com.kimilg.wayfinderapi.emotion.repository;

import com.kimilg.wayfinderapi.emotion.entity.EmotionTag;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Ilgoo.Kim
 */
public interface EmotionTagRepository extends JpaRepository<EmotionTag, Long> {
    Optional<EmotionTag> findByName(String name);
}
