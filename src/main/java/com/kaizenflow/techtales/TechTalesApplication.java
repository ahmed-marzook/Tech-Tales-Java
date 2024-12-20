package com.kaizenflow.techtales;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableJpaRepositories
@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
public class TechTalesApplication {

  public static void main(String[] args) {
    SpringApplication.run(TechTalesApplication.class, args);
  }
}
