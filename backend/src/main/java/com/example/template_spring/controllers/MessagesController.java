package com.example.template_spring.controllers;

import com.example.template_spring.dao.MessageDao;
import com.example.template_spring.dao.UserDao;
import com.example.template_spring.models.message.Message;
import com.example.template_spring.models.message.dict.MessageRoleUser;
import com.example.template_spring.models.user.User;
import com.example.template_spring.spring.auth.JWTUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class MessagesController {

    private final JWTUtil jwtUtil;
    private final MessageDao messageDao;
    private final UserDao userDao;

    @Autowired
    public MessagesController(JWTUtil jwtUtil, MessageDao messageDao, UserDao userDao) {
        this.jwtUtil = jwtUtil;
        this.messageDao = messageDao;
        this.userDao = userDao;
    }

    @GetMapping(value = "/tasks/{taskId}/messages", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Mono<List<Message>> getMessages(@RequestHeader HttpHeaders headers,
                                           @PathVariable("taskId") int taskId) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims {} want get messages for taskId {}", claims, taskId);

        int userId = Integer.parseInt(claims.get("id").toString());

        List<Message> list = messageDao.findByTaskId(taskId);
        list.forEach(message -> {
            if (message.getCreator().getId() == userId) {
                message.setRoleUser(MessageRoleUser.OWN);
            } else {
                message.setRoleUser(MessageRoleUser.NOT_OWN);
            }
        });
        return Mono.just(list);
    }

    @PostMapping(value = "/tasks/{taskId}/message", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Mono<Boolean> createMessage(@RequestBody Message message,
                                       @RequestHeader HttpHeaders headers,
                                       @PathVariable("taskId") Long taskId) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims: {} want create message: {} for taskId {}", claims, message, taskId);

        Long userId = Long.parseLong(claims.get("id").toString());

        Optional<User> user = userDao.findById(userId);
        if (user.isPresent()) {
            message.setCdat(new Date());
            message.setTaskId(taskId);
            message.setCreator(user.get());
            message = messageDao.save(message);

            if (message != null && message.getId() != 0) {
                return Mono.just(true);
            }
            return Mono.just(false);
        } else {
            log.error("user id {} not found", userId);
            return Mono.just(true);
        }
    }
}
