package com.example.template_spring.models;

import com.example.template_spring.models.dict.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Product extends AbstractEntity {

    @NonNull
    private String name;

    @NotNull
    private BigDecimal price;

    @NotNull
    private Category category;
}
