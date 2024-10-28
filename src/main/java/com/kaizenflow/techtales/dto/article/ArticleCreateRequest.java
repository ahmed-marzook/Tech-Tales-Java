package com.kaizenflow.techtales.dto.article;

public record ArticleCreateRequest(String title, String content, Long authorId) {}
