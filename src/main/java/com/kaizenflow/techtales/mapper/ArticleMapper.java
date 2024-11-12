package com.kaizenflow.techtales.mapper;

import com.kaizenflow.techtales.dto.article.ArticleResponse;
import com.kaizenflow.techtales.entity.Article;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
public interface ArticleMapper {

  @Mapping(source = "author.id", target = "authorId")
  @Mapping(source = "author.firstName", target = "authorFirstName")
  @Mapping(source = "author.lastName", target = "authorLastName")
  ArticleResponse articleToArticleResponse(Article article);
}
