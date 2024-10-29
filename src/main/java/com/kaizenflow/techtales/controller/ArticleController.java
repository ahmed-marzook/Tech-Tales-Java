package com.kaizenflow.techtales.controller;

import com.kaizenflow.techtales.dto.article.ArticleCreateRequest;
import com.kaizenflow.techtales.dto.article.ArticleDTO;
import com.kaizenflow.techtales.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
  public Page<ArticleDTO> getArticleList(@PageableDefault(value = 5, page = 0) Pageable pageable) {
    return articleService.getAllArticles(pageable);
  }

  @GetMapping("/author/{id}")
  public Page<ArticleDTO> getArticleByAuthorId(
      @PathVariable("id") Long id, @PageableDefault(value = 5, page = 0) Pageable pageable) {
    return articleService.getAllArticlesByAuthorId(id, pageable);
  }

  @PostMapping(
      consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Object> createNewArticle(@RequestBody ArticleCreateRequest newArticle)
      throws Exception {
    return new ResponseEntity<>(articleService.createNewArticle(newArticle), HttpStatus.CREATED);
  }

  @PutMapping(
      consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Object> updateArticle(@RequestBody ArticleDTO updateArticle)
      throws Exception {
    return new ResponseEntity<>(articleService.updateArticle(updateArticle), HttpStatus.NO_CONTENT);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteArticle(@PathVariable("id") Long id) throws Exception {
    articleService.deleteArticle(id);
    return new ResponseEntity<>("Successfully Deleted Article", HttpStatus.NO_CONTENT);
  }
}
