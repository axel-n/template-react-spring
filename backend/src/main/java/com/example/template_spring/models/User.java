package com.example.template_spring.models;

import com.example.template_spring.models.dict.RoleUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User extends AbstractEntity {

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private RoleUser role;

    @NotNull
    @JsonIgnore
    private String password;
}
