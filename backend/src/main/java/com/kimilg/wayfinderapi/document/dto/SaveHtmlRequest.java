package com.kimilg.wayfinderapi.document.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

/**
 * @author Ilgoo.Kim
 */
public record SaveHtmlRequest(
    @NotBlank String title,
    @NotEmpty List<@NotBlank String> tagNames,
    @NotBlank String html) {
}
