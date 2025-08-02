package com.institute.entities;

import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Status;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "admin")
@Getter
@Setter
@ToString
public class Admin extends BaseEntity {

	@Column(name = "name", length = 15, nullable = false )
	private String name;

	@Column(name = "phone_number", length = 15)
	private String phoneNumber;

	@Column(name = "address", length = 255)
	private String address;

	@Enumerated(EnumType.STRING)
	@Column(name = "gender", length = 15, nullable = false)
	private Gender gender;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", length = 15, nullable = false)
	private Status status = Status.ACTIVE;

	@OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Notice> notices = new ArrayList<>();

	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	private Login user;

}