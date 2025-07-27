package com.institute.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.math.BigDecimal;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.institute.entities.enums.Status;

@Entity
@Table(name = "course")
@Getter
@Setter
@ToString
public class Course extends BaseEntity {

	@Column(name = "name", length =30, nullable = false, unique = true)
	private String name;

	@Column(name = "description", length =200, nullable = false)
	private String description;

	@Column(name = "duration", length =30, nullable = false)
	private String duration;

	@Column(name = "start_date", nullable = false)
	private LocalDate startDate;
	
	@Column(name = "end_date")
	private LocalDate endDate;

	@Column(name = "course_fees", precision = 10, scale = 2)
	private BigDecimal courseFees;

	@Column(name = "max_students", nullable = false)
	private Integer maxStudents;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", length = 10, nullable = false)
	private Status status = Status.ACTIVE;

	@OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Student> students = new ArrayList<Student>();

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
	    name = "course_teacher",
	    joinColumns = @JoinColumn(name = "course_id"),
	    inverseJoinColumns = @JoinColumn(name = "teacher_id")
	)
	private Set<Teacher> teachers = new HashSet<>();


	@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	@JoinTable(
	    name = "course_subject",
	    joinColumns = @JoinColumn(name = "course_id"),
	    inverseJoinColumns = @JoinColumn(name = "subject_id")
	)
	private Set<Subject> subjects = new HashSet<>();




}
