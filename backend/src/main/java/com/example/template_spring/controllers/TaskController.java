package com.example.template_spring.controllers;

import com.example.template_spring.dao.TaskDao;
import com.example.template_spring.dao.UserDao;
import com.example.template_spring.models.task.Task;
import com.example.template_spring.models.task.dict.TaskStatus;
import com.example.template_spring.models.task.dict.WorkFlow;
import com.example.template_spring.models.user.User;
import com.example.template_spring.spring.auth.JWTUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class TaskController {

    private final TaskDao taskDao;
    private final UserDao userDao;
    private final JWTUtil jwtUtil;

    public TaskController(JWTUtil jwtUtil, TaskDao contractDao, UserDao userDao) {
        this.jwtUtil = jwtUtil;
        this.taskDao = contractDao;
        this.userDao = userDao;
    }

    @GetMapping(value = "/contracts/createdByMe", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Mono<Page<Task>> getContractCreatedByMe(@RequestHeader HttpHeaders headers,
                                                   @RequestParam(value = "page", defaultValue = "0") int page,
                                                   @RequestParam(value = "elementsPerPage", defaultValue = "10") int elementsPerPage) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims {} want get created by yourself contract", claims);

        int userId = Integer.parseInt(claims.get("id").toString());
        return Mono.just(taskDao.findByCreator_Id(userId, PageRequest.of(page, elementsPerPage)));
    }


    @GetMapping(value = "/contracts/assignedForMe", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Mono<Page<Task>> getContractAssignedForMe(@RequestHeader HttpHeaders headers,
                                                     @RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "elementsPerPage", defaultValue = "10") int elementsPerPage) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        log.info("user with claims {} want get assigned by yourself contract", claims);

        int userId = Integer.parseInt(claims.get("id").toString());
        return Mono.just(taskDao.findByAssigner_Id(userId, PageRequest.of(page, elementsPerPage)));
    }


    @PutMapping(value = "/contract/{contractId}/changeStatus", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Mono<Boolean> setNewContractStatus(@RequestHeader HttpHeaders headers,
                                              @PathVariable Long contractId,
                                              @RequestBody Map<String, String> params) {

        Claims claims = jwtUtil.getAllClaimsFromHeaders(headers);
        String newStatusRow = params.get("newStatus");
        if (newStatusRow != null) {

            Long userId = Long.parseLong(claims.get("id").toString());
            TaskStatus newStatus = TaskStatus.valueOf(newStatusRow);
            log.info("user with claims: {} want change status: {} for contractId: {}", claims, newStatus, contractId);

            boolean resultUpdateStatus = updateStatus(contractId, userId, newStatus);
            boolean resultChangeAssignTeam = changeAssignTeam(contractId, userId, newStatus);

            return Mono.just(resultUpdateStatus && resultChangeAssignTeam);
        } else {
            log.error("not found newStatus");
            return Mono.just(false);
        }
    }

    private boolean changeAssignTeam(Long contractId, Long userId, TaskStatus newStatus) {

        if (newStatus == TaskStatus.DONE) {
            Optional<Task> contractRow = taskDao.findById(contractId);

            if (contractRow.isPresent()) {
                Task contract = contractRow.get();

                if (contract.getAssigner() != null && contract.getAssigner().getId().equals(userId)) {
                    int oldAssignTeamIndex = contract.getAssignTeam().ordinal();
                    int nextAssignTeamIndex = oldAssignTeamIndex + 1;
                    WorkFlow nextAssignTeam = WorkFlow.values()[nextAssignTeamIndex];

                    Long countAffectedRowsAssignTeam = taskDao.changeAssignTeam(contractId, nextAssignTeam);
                    return countAffectedRowsAssignTeam == 1;
                }
            }
            return false;

        } else {
            return true;
        }
    }

    private boolean updateStatus(Long contractId, Long userId, TaskStatus newStatus) {

        Optional<User> user = userDao.findById(userId);
        if (user.isPresent()) {
            Long countAffectedRows = taskDao.updateStatus(contractId, user.get(), newStatus);
            return countAffectedRows == 1;
        }
        return false;
    }

    @GetMapping(value = "/contracts/board", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Mono<List<Map<String, Object>>> getContractsForDesk() {

        List<Map<String, Object>> response = new ArrayList<>();

        Arrays.asList(WorkFlow.values())
                .forEach(item -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("name", item.name());
                    map.put("values", taskDao.findByAssignTeam(WorkFlow.valueOf(item.name())));

                    response.add(map);
                });

        return Mono.just(response);
    }

}
