package com.kaizenflow.techtales.service;

import com.kaizenflow.techtales.dto.article.ArticleCreateRequest;
import com.kaizenflow.techtales.dto.article.ArticleDTO;
import com.kaizenflow.techtales.dto.article.ArticleResponse;
import com.kaizenflow.techtales.entity.Article;
import com.kaizenflow.techtales.entity.Author;
import com.kaizenflow.techtales.mapper.ArticleMapper;
import com.kaizenflow.techtales.repository.ArticleRepository;
import com.kaizenflow.techtales.repository.AuthorRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.Objects;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

  private final ArticleRepository articleRepository;

  private final AuthorRepository authorRepository;

  private final ArticleMapper articleMapper;

  @Autowired
  public ArticleService(
      ArticleRepository articleRepository,
      AuthorRepository authorRepository,
      ArticleMapper articleMapper) {
    this.articleRepository = articleRepository;
    this.authorRepository = authorRepository;
    this.articleMapper = articleMapper;
  }

  public ArticleResponse getArticleById(Long id) {
    return articleMapper.articleToArticleResponse(articleRepository.findById(id).orElseThrow());
  }

  public Page<ArticleResponse> getAllArticles(Pageable pageable) {
    return articleRepository.findAll(pageable).map(articleMapper::articleToArticleResponse);
  }

  public Page<ArticleResponse> getAllArticlesByAuthorId(Long id, Pageable pageable) {
    return articleRepository
        .findByAuthorId(id, pageable)
        .map(articleMapper::articleToArticleResponse);
  }

  @Transactional()
  public Long createNewArticle(ArticleCreateRequest newRequest) {
    Author existingAuthor = null;
    if (Objects.nonNull(newRequest.authorId())) {
      existingAuthor =
          authorRepository
              .findById(newRequest.authorId())
              .orElseThrow(() -> new EntityNotFoundException("No Exist Author for That ID"));
    }
    Article newArticleRequest =
        Article.builder()
            .title(newRequest.title())
            .content(newRequest.content())
            .author(existingAuthor)
            .build();

    return articleRepository.save(newArticleRequest).getId();
  }

  @Transactional()
  public Long updateArticle(ArticleDTO updateArticle) {
    Article article =
        articleRepository
            .findById(updateArticle.id())
            .orElseThrow(() -> new EntityNotFoundException("No Exist Article for That ID"));

    // Used Safelist.basic() which allows basic HTML formatting (b, i, u, strong, em) but removes
    // scripts and dangerous tags
    if (updateArticle.content() != null) {
      String sanitizedContent = Jsoup.clean(updateArticle.content(), Safelist.basic());
      article.setContent(sanitizedContent);
    }

    // Safelist.none() - removes all HTML
    if (updateArticle.title() != null) {
      String sanitizedTitle = Jsoup.clean(updateArticle.title(), Safelist.none());
      article.setTitle(sanitizedTitle);
    }

    return article.getId();
  }

  @Transactional()
  public void deleteArticle(Long id) {
    Article article =
        articleRepository
            .findById(id)
            .orElseThrow(() -> new EntityNotFoundException("No Exist Author for That ID"));

    articleRepository.delete(article);
  }
}
