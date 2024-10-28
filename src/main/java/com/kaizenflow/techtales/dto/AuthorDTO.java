package com.kaizenflow.techtales.dto;

import jakarta.persistence.Embeddable;

public record AuthorDTO(Long id, String firstName, String lastName, String email, String bio) {}
