package com.institute.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

import com.institute.entities.enums.Status;

@Entity
@Table(name = "course")
@Getter
@Setter
@ToString
public class Course extends BaseEntity {

	@Column(name = "name", length =30, nullable = false, unique = true)
	private String name;

	@Column(name = "description", length =100, nullable = false)
	private String description;

	@Column(name = "duration", length =30, nullable = false)
	private String duration;

	@Column(name = "start_date", nullable = false)
	private LocalDate startDate;
	
	@Column(name = "end_date")
	private LocalDate endDate;

	@Column(name = "fees", precision = 10, scale = 2)
	private Double fees;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", length = 10, nullable = false)
	private Status status = Status.ACTIVE;
}
