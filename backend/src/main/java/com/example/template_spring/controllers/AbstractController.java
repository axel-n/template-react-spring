package com.example.template_spring.controllers;

import com.example.template_spring.dao.CommonRepository;
import com.example.template_spring.models.AbstractEntity;
import com.example.template_spring.spring.auth.JWTUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@Slf4j
public abstract class AbstractController<E extends AbstractEntity, R extends CommonRepository>{

    private final R repo;
    private final JWTUtil jwtUtil;

    public AbstractController(R repo, JWTUtil jwtUtil) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
    }

    public Long add(@RequestBody E entity) {
        entity = (E) repo.save(entity);
        return entity.getId();
    }

    @GetMapping("/")
    public Page<E> getAll(@RequestHeader HttpHeaders headers,
                          @RequestParam(value = "page", defaultValue = "0") int page,
                          @RequestParam(value = "size", defaultValue = "10") int size) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims {} want get  entities", claims);

        return repo.findAll(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public E getOne(@RequestHeader HttpHeaders headers,
                    @PathVariable Long id) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims {} want get entity by id {}", claims, id);

        return (E) repo.findOneById(id);
    }


    @PutMapping("/")
    public Boolean update(@RequestHeader HttpHeaders headers,
                          @RequestBody E entity) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims {} want update entity {}", claims, entity);
        repo.save(entity);

        // todo how to check this?
        return true;
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@RequestHeader HttpHeaders headers,
                          @PathVariable Long id) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims {} want delete entity by id {}", claims, id);
        repo.deleteById(id);

        // todo how to check this? only 2 queries?
        return true;
    }
}
