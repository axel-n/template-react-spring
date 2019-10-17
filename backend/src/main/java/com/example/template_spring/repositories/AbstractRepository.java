package com.example.template_spring.repositories;

import com.example.template_spring.models.AbstractEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface AbstractRepository<E extends AbstractEntity> extends JpaRepository<E, Long> {
    E findOneById(Long id);

    Page<E> findAll(Pageable pageable);
}
