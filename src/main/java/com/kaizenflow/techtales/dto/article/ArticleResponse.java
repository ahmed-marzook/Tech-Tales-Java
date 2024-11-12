package com.kaizenflow.techtales.dto.article;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.ZonedDateTime;

public record ArticleResponse(
    Long id,
    String title,
    String content,
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") ZonedDateTime publishingDate,
    Long authorId,
    String authorFirstName,
    String authorLastName,
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") ZonedDateTime updatedAt) {}
