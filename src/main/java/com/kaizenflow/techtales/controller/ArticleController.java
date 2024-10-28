package com.kaizenflow.techtales.controller;

import com.kaizenflow.techtales.dto.ArticleDTO;
import com.kaizenflow.techtales.service.ArticleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(path = "api/v1/articles")
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
    return articleService.getAllArticles();
  }

  @GetMapping("/author/{id}")
  public List<ArticleDTO> getArticleByAuthorId(@PathVariable("id") Long id) {
    return articleService.getAllArticlesByAuthorId(id);
  }

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
          produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Object> createNewArticle(@RequestBody ArticleDTO newArticle) {
    return new ResponseEntity<>(articleService.createNewArticle(newArticle), HttpStatus.CREATED);
  }
}
