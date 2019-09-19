package com.example.template_spring.models.task;

import com.example.template_spring.models.user.User;
import com.example.template_spring.models.task.dict.TaskStatus;
import com.example.template_spring.models.task.dict.WorkFlow;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String name;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "creator")
    private User creator;

    @ManyToOne
    @JoinColumn(name = "assigner")
    private User assigner;

    @NotNull
    private TaskStatus status;

    private String description;

    @NotNull
    private WorkFlow assignTeam;

    @NotNull
    private Date cdat;

    private Date udat;
}
