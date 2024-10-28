package com.kaizenflow.techtales.dto;

import java.time.ZonedDateTime;

public record ArticleDTO(Long id, String title, String content, ZonedDateTime publishingDate) {}
