package com.kaizenflow.techtales.service;

import com.kaizenflow.techtales.dto.author.AuthorCreateRequest;
import com.kaizenflow.techtales.dto.author.AuthorDTO;
import com.kaizenflow.techtales.entity.Author;
import com.kaizenflow.techtales.repository.AuthorRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
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

  public AuthorDTO getAuthorById(Long id) {
    return authorRepository
        .findAuthorById(id)
        .orElseThrow(() -> new EntityNotFoundException("No Exist Author for That ID"));
  }

  public List<AuthorDTO> getAllAuthors() {
    return authorRepository.findAllAuthorDTOs();
  }
}
