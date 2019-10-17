package com.example.template_spring.repositories;

import com.example.template_spring.models.Product;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends AbstractRepository<Product> {
}

