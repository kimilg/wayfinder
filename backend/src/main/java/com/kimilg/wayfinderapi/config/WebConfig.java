/**
 * @(#)WebConfig.java 2025. 05. 31
 * <p>
 * Copyright 2025 Naver Corp. All rights Reserved. Naver PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.kimilg.wayfinderapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author Ilgoo.Kim
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("*");
    }
}
