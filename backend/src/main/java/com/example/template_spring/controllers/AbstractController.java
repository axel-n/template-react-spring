package com.example.template_spring.controllers;

import com.example.template_spring.repositories.AbstractRepository;
import com.example.template_spring.models.AbstractEntity;
import com.example.template_spring.spring.auth.JWTUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Date;

@Slf4j
public abstract class AbstractController<E extends AbstractEntity, R extends AbstractRepository> {

    private final R repo;
    private final JWTUtil jwtUtil;

    public AbstractController(R repo, JWTUtil jwtUtil) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/")
    public Mono<Page<E>> getAll(@RequestHeader HttpHeaders headers,
                                @RequestParam(value = "page", defaultValue = "0") int page,
                                @RequestParam(value = "size", defaultValue = "10") int size) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims {} want get  entities", claims);

        return Mono.just(repo.findAll(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    public Mono<E> getOne(@RequestHeader HttpHeaders headers,
                          @PathVariable Long id) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims {} want get entity by id {}", claims, id);

        return Mono.just((E) repo.findOneById(id));
    }


    @PutMapping("/")
    public Mono<Boolean> update(@RequestHeader HttpHeaders headers,
                                @RequestBody E entity) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims {} want update entity {}", claims, entity);
        entity.setUdat(new Date());
        repo.save(entity);

        // todo how to check this?
        return Mono.just(true);
    }

    @PostMapping("/")
    public Mono<Long> create(@RequestHeader HttpHeaders headers,
                             @RequestBody E entity) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims {} want create entity {}", claims, entity);
        entity.setCdat(new Date());
        entity = (E) repo.save(entity);

        return Mono.just(entity.getId());
    }

    @DeleteMapping("/{id}")
    public Mono<Boolean> delete(@RequestHeader HttpHeaders headers,
                                @PathVariable Long id) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims {} want delete entity by id {}", claims, id);
        repo.deleteById(id);

        // todo how to check this? only 2 queries?
        return Mono.just(true);
    }
}
