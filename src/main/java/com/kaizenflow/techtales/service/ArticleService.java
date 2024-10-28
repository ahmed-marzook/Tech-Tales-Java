package com.kaizenflow.techtales.service;

import com.kaizenflow.techtales.dto.article.ArticleCreateRequest;
import com.kaizenflow.techtales.dto.article.ArticleDTO;
import com.kaizenflow.techtales.entity.Article;
import com.kaizenflow.techtales.entity.Author;
import com.kaizenflow.techtales.repository.ArticleRepository;
import com.kaizenflow.techtales.repository.AuthorRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

  private final ArticleRepository articleRepository;

  private final AuthorRepository authorRepository;

  @Autowired
  public ArticleService(ArticleRepository articleRepository, AuthorRepository authorRepository) {
    this.articleRepository = articleRepository;
    this.authorRepository = authorRepository;
  }

  public ArticleDTO getArticleById(Long id) {
    return articleRepository.getArticleById(id).orElseThrow();
  }

  public List<ArticleDTO> getAllArticles() {
    return articleRepository.findAllArticleDTOs();
  }

  public List<ArticleDTO> getAllArticlesByAuthorId(Long id) {
    return articleRepository.findAllArticleDTOsByAuthorId(id);
  }

  @Transactional()
  public Long createNewArticle(ArticleCreateRequest newRequest) throws Exception {
    Author existingAuthor =
        authorRepository
            .findById(newRequest.authorId())
            .orElseThrow(() -> new EntityNotFoundException("No Exist Author for That ID"));
    Article newArticleRequest =
        Article.builder()
            .title(newRequest.title())
            .content(newRequest.content())
            .author(existingAuthor)
            .build();

    return articleRepository.save(newArticleRequest).getId();
  }
}
