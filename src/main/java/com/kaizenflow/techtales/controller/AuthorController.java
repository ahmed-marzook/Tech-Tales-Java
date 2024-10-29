package com.kaizenflow.techtales.controller;

import com.kaizenflow.techtales.dto.author.AuthorCreateRequest;
import com.kaizenflow.techtales.dto.author.AuthorDTO;
import com.kaizenflow.techtales.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/author")
public class AuthorController {

  private final AuthorService authorService;

  @Autowired
  public AuthorController(AuthorService authorService) {
    this.authorService = authorService;
  }

  @GetMapping("/{id}")
  public AuthorDTO getAuthor(@PathVariable("id") Long id) {
    return authorService.getAuthorById(id);
  }

  @GetMapping()
  public List<AuthorDTO> getAuthorList() {
    return authorService.getAllAuthors();
  }

  @PostMapping
  public ResponseEntity<Object> createNewAuthor(
      @RequestBody AuthorCreateRequest authorCreateRequest) {
    return new ResponseEntity<>(
        authorService.createNewAuthor(authorCreateRequest), HttpStatus.CREATED);
  }
}
