package com.institute.entities;

import com.institute.entities.enums.Role;
import com.institute.entities.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "login", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "password")
public class Login extends BaseEntity {

	@Column(name = "email", length = 100, nullable = false, unique = true)
	private String email;

	@Column(name = "password", length = 255, nullable = false)
	private String password = "12345";

	@Enumerated(EnumType.STRING)
	@Column(name = "role", length = 20, nullable = false)
	private Role role; // ADMIN, STUDENT, TEACHER

	@Enumerated(EnumType.STRING)
	@Column(name = "status", length = 10, nullable = false)
	private Status status = Status.ACTIVE; // ACTIVE, INACTIVE

	@Column(name = "last_login")
	private LocalDateTime lastLogin;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Student student;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Teacher teacher;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Admin admin;
}

