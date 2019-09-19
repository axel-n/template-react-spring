package com.example.template_spring.models.user;

import com.example.template_spring.models.message.Message;
import com.example.template_spring.models.task.Task;
import com.example.template_spring.models.user.dict.RoleUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private RoleUser role;

    @JsonIgnore
    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> taskListCreator;

    @JsonIgnore
    @OneToMany(mappedBy = "assigner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> taskListAssigner;

    @JsonIgnore
    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Message> messageList;

    @NotNull
    @JsonIgnore
    private String password;

    @NotNull
    private boolean enabled;
}
