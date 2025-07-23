package com.institute.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Status;

@Entity
@Table(name = "teachers")
@Getter
@Setter
@ToString(exclude = "password")
public class Teacher extends BaseEntity {

	@Column(name = "first_name", nullable = false, length = 50)
	private String firstName;

	@Column(name = "last_name", length = 50)
	private String lastName;

	@Column(name = "email", unique = true, nullable = false, length = 100)
	private String email;

	@Column(name = "password", nullable = false, length = 255)
    private String password;
	
	@Column(name = "phone_number", length = 15)
	private String phoneNumber;

	@Column(name = "address", length = 255)
	private String address;

	@Enumerated(EnumType.STRING)
	@Column(name = "gender", nullable = false, length = 10)
	private Gender gender;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false, length = 10)
	private Status status = Status.ACTIVE;

	@Column(name = "dob")
	private LocalDate dob;

	@Column(name = "joining_date")
	private LocalDate joiningDate;

	@Column(name = "qualification", length = 100)
	private String qualification;

	@Column(name = "experience", length = 100)
	private String experience;

}
