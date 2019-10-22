package com.example.template_spring.repositories;

import com.example.template_spring.models.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDao extends AbstractRepository<User> {
    Optional<User> findOneByEmail(String email);
}
