package com.kaizenflow.techtales.repository;

import com.kaizenflow.techtales.dto.article.ArticleDTO;
import com.kaizenflow.techtales.entity.Article;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArticleRepository extends JpaRepository<Article, Long> {

  @Query(
      value =
          "SELECT new com.kaizenflow.techtales.dto.article.ArticleDTO(a.id, a.title, a.content, a.publishingDate, "
              + "a.author.id, CONCAT(a.author.firstName, ' ', a.author.lastName), "
              + "a.createdAt, a.updatedAt) "
              + "FROM Article a WHERE a.id = :id")
  Optional<ArticleDTO> getArticleById(@Param("id") Long id);

  @Query(
      value =
          "SELECT new com.kaizenflow.techtales.dto.article.ArticleDTO(a.id, a.title, a.content, a.publishingDate, "
              + "a.author.id, CONCAT(a.author.firstName, ' ', a.author.lastName), "
              + "a.createdAt, a.updatedAt) "
              + "FROM Article a",
      countQuery = "SELECT COUNT(a) FROM Article a")
  Page<ArticleDTO> findAllArticleDTOs(Pageable pageable);

  @Query(
      value =
          "SELECT new com.kaizenflow.techtales.dto.article.ArticleDTO(a.id, a.title, a.content, a.publishingDate, "
              + "a.author.id, CONCAT(a.author.firstName, ' ', a.author.lastName), "
              + "a.createdAt, a.updatedAt) "
              + "FROM Article a WHERE a.author.id = :authorId",
      countQuery = "SELECT COUNT(a) FROM Article a WHERE a.author.id = :authorId")
  Page<ArticleDTO> findAllArticleDTOsByAuthorId(
      @Param("authorId") Long authorId, Pageable pageable);
}
