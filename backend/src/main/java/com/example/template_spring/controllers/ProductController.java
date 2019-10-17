package com.example.template_spring.controllers;

import com.example.template_spring.models.Product;
import com.example.template_spring.repositories.ProductRepository;
import com.example.template_spring.spring.auth.JWTUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/products")
public class ProductController extends AbstractController<Product, ProductRepository> {

    public ProductController(JWTUtil jwtUtil, ProductRepository productRepository) {
        super(productRepository, jwtUtil);
    }
}
