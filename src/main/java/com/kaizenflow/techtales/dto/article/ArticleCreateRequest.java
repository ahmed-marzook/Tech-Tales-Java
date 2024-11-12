package com.kaizenflow.techtales.dto.article;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ArticleCreateRequest(
    @NotBlank(message = "Title is required")
        @Size(min = 1, max = 255, message = "Title must be between 5 and 255 characters")
        String title,
    @NotBlank(message = "Content is required")
    String content,
    @Nullable Long authorId) {}
