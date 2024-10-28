package com.kaizenflow.techtales.service;

import com.kaizenflow.techtales.dto.ArticleDTO;
import com.kaizenflow.techtales.repository.ArticleRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

  private final ArticleRepository articleRepository;

  @Autowired
  public ArticleService(ArticleRepository articleRepository) {
    this.articleRepository = articleRepository;
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
}
