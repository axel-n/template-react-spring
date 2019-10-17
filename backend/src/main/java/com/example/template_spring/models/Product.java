package com.example.template_spring.models;

import com.example.template_spring.models.dict.Category;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;


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

    @NotNull
    private Date cdat;

    private Date udat;
}
