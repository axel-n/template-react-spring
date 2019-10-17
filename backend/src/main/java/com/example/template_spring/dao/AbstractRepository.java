package com.example.template_spring.dao;

import com.example.template_spring.models.AbstractEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface AbstractRepository<E extends AbstractEntity> extends JpaRepository<E, Long> {
    E findOneById(Long id);
}
