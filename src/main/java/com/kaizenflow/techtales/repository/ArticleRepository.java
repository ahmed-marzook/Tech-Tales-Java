package com.kaizenflow.techtales.repository;

import com.kaizenflow.techtales.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    Page<Article> findByAuthorId(Long authorId, Pageable pageable);
}
