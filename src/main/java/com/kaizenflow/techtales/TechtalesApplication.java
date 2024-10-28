package com.kaizenflow.techtales;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class TechtalesApplication {

  public static void main(String[] args) {
    SpringApplication.run(TechtalesApplication.class, args);
  }
}
