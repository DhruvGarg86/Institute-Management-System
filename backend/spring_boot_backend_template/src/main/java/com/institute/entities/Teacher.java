package com.institute.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Status;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "teachers")
@Getter
@Setter

@ToString(exclude = "attendance,subjects,courseSubjectTeachers")
@JsonIgnoreProperties({"attendance,subjects,courseSubjectTeachers"})
public class Teacher extends BaseEntity {

	@Column(name = "name", nullable = false, length = 50)
	private String name;

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

	@Column(name = "joining_date")
	private LocalDate joiningDate;

	@Column(name = "salary", precision = 10, scale = 2)
	private  BigDecimal salary;

	@Column(name = "image", length = 500)
	private String image;

	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	private Login user;

	@OneToOne(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
	private Attendance attendance;

	@OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Subject> subjects;

	@OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<CourseSubjectTeacher> courseSubjectTeachers = new HashSet<>();

	public String getEncodedPassword(String name)
	{
		String defaultName = name + "@123";
		return defaultName;
	}

}