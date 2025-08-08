package com.institute.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "subjects")
@Getter
@Setter
@ToString
public class Subject extends BaseEntity {

	@Column(name = "name", length = 50, nullable = false, unique = true)
	private String name;

	@Column(name = "code", nullable = false, unique = true)
	private Integer code;

	@Column(name = "description", length = 255)
	private String description;

	@OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private Set<Marks> marks = new HashSet<>();

	@OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<CourseSubjectTeacher> courseSubjectTeachers = new HashSet<>();
	
}
