package com.kaizenflow.techtales.repository;

import com.kaizenflow.techtales.dto.author.AuthorDTO;
import com.kaizenflow.techtales.entity.Author;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AuthorRepository extends JpaRepository<Author, Long> {

  Optional<AuthorDTO> findAuthorById(Long id);

  @Query(
      "SELECT new com.kaizenflow.techtales.dto.author.AuthorDTO(a.id, "
          + " a.firstName, a.lastName, a.email, a.bio) "
          + "FROM Author a")
  List<AuthorDTO> findAllAuthorDTOs();
}
