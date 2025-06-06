package com.kimilg.wayfinderapi.document.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

/**
 * @author Ilgoo.Kim
 */
public record HtmlRequest(
    @NotEmpty List<@NotBlank String> tagNames
    ) {

}
