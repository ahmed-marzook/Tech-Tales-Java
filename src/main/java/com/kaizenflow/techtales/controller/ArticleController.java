package com.kaizenflow.techtales.controller;

import com.kaizenflow.techtales.dto.ArticleDTO;
import com.kaizenflow.techtales.service.ArticleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController("/articles")
public class ArticleController {

  private final ArticleService articleService;

  @Autowired
  public ArticleController(ArticleService articleService) {
    this.articleService = articleService;
  }

  @GetMapping("/{id}")
  public ArticleDTO getArticle(@PathVariable("id") Long id) {
    return articleService.getArticleById(id);
  }

  @GetMapping
  public List<ArticleDTO> getArticleList() {
    return null;
  }

  public List<ArticleDTO> getArticleByAuthor(@PathVariable String authorName) {
    return null;
  }
}
