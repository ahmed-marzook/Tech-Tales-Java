package com.kaizenflow.techtales.service;

import com.kaizenflow.techtales.dto.author.AuthorCreateRequest;
import com.kaizenflow.techtales.entity.Author;
import com.kaizenflow.techtales.repository.AuthorRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {
  private final AuthorRepository authorRepository;

  public AuthorService(AuthorRepository authorRepository) {
    this.authorRepository = authorRepository;
  }

  public Long createNewAuthor(AuthorCreateRequest authorCreateRequest) {
    Author newAuthor =
        Author.builder()
            .firstName(authorCreateRequest.firstName())
            .lastName(authorCreateRequest.lastName())
            .bio(authorCreateRequest.bio())
            .email(authorCreateRequest.email())
            .build();
    return authorRepository.save(newAuthor).getId();
  }
}
