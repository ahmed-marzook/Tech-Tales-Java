package com.kaizenflow.techtales.controller;

import com.kaizenflow.techtales.dto.ArticleDTO;
import com.kaizenflow.techtales.service.ArticleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(path = "api/v1/articles")
public class ArticleController {

  @Autowired
  private ArticleService articleService;

  @GetMapping("/{id}")
  public ArticleDTO getArticle(@PathVariable("id") Long id) {
    System.out.println("Hello World");
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
