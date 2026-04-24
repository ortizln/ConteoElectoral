package com.electoral;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ConteoElectoralApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConteoElectoralApplication.class, args);
    }
}