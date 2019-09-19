package com.example.template_spring.models.message;

import com.example.template_spring.models.message.dict.MessageRoleUser;
import com.example.template_spring.models.user.User;
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
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User creator;

	@Transient
	private MessageRoleUser roleUser;

	@NotNull
	private String comment;

	@NotNull
	private Long taskId;

	@NotNull
	private Date cdat;

	private Date udat;
}
