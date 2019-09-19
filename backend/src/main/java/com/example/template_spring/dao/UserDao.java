package com.example.template_spring.dao;

import com.example.template_spring.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {
    Optional<User> findOneByEmail(String email);
    Optional<User> findById(Long id);
}
