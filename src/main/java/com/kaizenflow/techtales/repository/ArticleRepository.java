package com.kaizenflow.techtales.repository;

import com.kaizenflow.techtales.dto.ArticleDTO;
import com.kaizenflow.techtales.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

  ArticleDTO getArticleById(Long id);
}
