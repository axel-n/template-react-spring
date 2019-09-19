package com.example.template_spring.dao;

import com.example.template_spring.models.task.Task;
import com.example.template_spring.models.task.dict.TaskStatus;
import com.example.template_spring.models.task.dict.WorkFlow;
import com.example.template_spring.models.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskDao extends JpaRepository<Task, Long> {

    Page<Task> findByAssigner_Id(int userId, Pageable pageable);
    Page<Task> findByCreator_Id(int userId, Pageable pageable);
    List<Task> findAll();

    @Modifying
    @Transactional
    @Query("UPDATE Task c SET c.status = :status, c.assigner = :assigner, c.udat = CURRENT_TIMESTAMP WHERE c.id = :taskId")
    Long updateStatus(@Param("taskId") Long taskId, @Param("assigner") User assigner, @Param("status") TaskStatus status);

    @Modifying
    @Transactional
    @Query("UPDATE Task c SET c.assignTeam = :assignTeam, c.assigner = null, c.status = 0, c.udat = CURRENT_TIMESTAMP WHERE c.id = :taskId")
    Long changeAssignTeam(@Param("taskId") Long taskId, @Param("assignTeam") WorkFlow assignTeam);

    Optional<Task> findById(Long contractId);
    List<Task> findByAssignTeam(WorkFlow assignTeam);
}

