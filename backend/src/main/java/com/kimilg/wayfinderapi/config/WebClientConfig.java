/**
 * @(#)WebClientConfig.java 2025. 05. 31
 * <p>
 * Copyright 2025 Naver Corp. All rights Reserved. Naver PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.kimilg.wayfinderapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * @author Ilgoo.Kim
 */
@Configuration
public class WebClientConfig {

    @Value("${openai.api.key}")
    private String openAiApiKey;
    
    @Bean
    public WebClient openAiWebClient() {
        return WebClient.builder()
            .baseUrl("https://api.openai.com/v1")
            .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + openAiApiKey)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
    }
}
