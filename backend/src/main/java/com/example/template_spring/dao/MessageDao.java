package com.example.template_spring.dao;

import com.example.template_spring.models.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageDao extends JpaRepository<Message, Integer> {
    List<Message> findByTaskId(int taskId);
}
