package com.institute.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Status;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "teachers")
@Getter
@Setter
@ToString(exclude = "password,attendance,subjects,courseSubjectTeachers")
@JsonIgnoreProperties({"attendance,subjects,courseSubjectTeachers"})
public class Teacher extends BaseEntity {

	@Column(name = "name", nullable = false, length = 50)
	private String name;

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

	@Column(name = "salary", precision = 10, scale = 2)
	private  BigDecimal salary;
	
	@Column(name = "image", length = 500)
	private String image;

	@OneToOne(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
	private Attendance attendance;

	@OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Subject> subjects;

	@OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<CourseSubjectTeacher> courseSubjectTeachers = new HashSet<>();


}
