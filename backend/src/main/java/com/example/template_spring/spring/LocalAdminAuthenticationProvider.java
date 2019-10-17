package com.example.template_spring.spring;

import com.example.template_spring.repositories.UserDao;
import com.example.template_spring.models.User;
import com.example.template_spring.spring.auth.JWTUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.util.Collections;
import java.util.Objects;

@Slf4j
@Component
public class LocalAdminAuthenticationProvider implements ReactiveAuthenticationManager, Serializable {

    private final JWTUtil jwtUtil;
    private final UserDao userDao;
    private final BCryptPasswordEncoder encoder;

    @Autowired
    public LocalAdminAuthenticationProvider(JWTUtil jwtUtil, UserDao userDao) {
        this.jwtUtil = jwtUtil;
        this.userDao = userDao;
        this.encoder = new BCryptPasswordEncoder();
    }

    /**
     * проверяет валидность токена
     * во всех случаях (кроме логина)
     */
    @Override
    public Mono<Authentication> authenticate(Authentication req) throws AuthenticationException {
        String authToken = req.getCredentials().toString();

        String username = null;
        String role = null;
        try {
            username = jwtUtil.getUsernameFromToken(authToken);
            Claims claims = jwtUtil.getAllClaimsFromToken(authToken);
            role = String.valueOf(claims.get("role"));

            log.info("claims for user {}", claims);
        } catch (Exception e) {
            log.error("error: {}", e.getMessage());
        }

        if (username != null && jwtUtil.validateToken(authToken)) {
            UsernamePasswordAuthenticationToken springUserDetails = new UsernamePasswordAuthenticationToken(username, null,  Collections.singletonList(new SimpleGrantedAuthority(role)));
            return Mono.just(springUserDetails);
        } else {
            log.error("user {} send invalid token {}", username, authToken);
            return Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED, null));
        }
    }

    /**
     * проверяет валидность логина и пароля, включен ли пользователь
     * только во время логина
     */
    public Mono<User> authenticate(String email, String password) throws AuthenticationException {
        return Mono.just(userDao.findOneByEmail(email))
                .filter(Objects::nonNull)
                .map(user -> {
                    log.info("user with id {}, email {} want enter to system", user.getId(), user.getEmail());
                    if (encoder.matches(password, user.getPassword())) {
                        log.info("pass valid");
                        return user;
                    } else {
                        log.info("pass not valid");
                        return null;
                    }
                })
                .switchIfEmpty(Mono.defer(() -> {
                    log.info("not found user with email {}", email);
                    return Mono.empty();
                }))
                .onErrorResume(e -> {
                    log.error("error authenticating: {}", e.getMessage());
                    return Mono.empty();
                });
    }
}

