package com.kaizenflow.techtales.dto.article;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.ZonedDateTime;

public record ArticleDTO(
    Long id,
    String title,
    String content,
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") ZonedDateTime publishingDate,
    Long authorId,
    String authorFullName,
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") ZonedDateTime createdAt,
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") ZonedDateTime updatedAt) {}
