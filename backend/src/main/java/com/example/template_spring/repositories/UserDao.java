package com.example.template_spring.repositories;

import com.example.template_spring.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends AbstractRepository<User> {
    User findOneByEmail(String email);
}
