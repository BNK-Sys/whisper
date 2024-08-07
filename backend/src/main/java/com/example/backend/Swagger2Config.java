//package com.example.backend;
//
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class Swagger2Config {
//
//    @Bean
//    public GroupedOpenApi publicApi() {
//        return GroupedOpenApi.builder()
//                .group("v1-definition")
//                .pathsToMatch("/**")
//                .build();
//    }
//    @Bean
//    public OpenAPI springShopOpenAPI() {
//        return new OpenAPI()
//                .info(new Info().title("soksok API")
//                        .description("소외계층을 위한 뱅킹서비스 API 명세서입니다.")
//                        .version("v0.0.1"));
//    }
//}