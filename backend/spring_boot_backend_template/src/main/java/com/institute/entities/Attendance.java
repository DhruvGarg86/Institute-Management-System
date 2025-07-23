package com.institute.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "attendance")
@Getter
@Setter
@ToString
public class Attendance extends BaseEntity {

	@Column(name = "present_days", nullable = false)
	private Integer presentDays;

	@Column(name = "absent_days", nullable = false)
	private Integer absentDays;

	@Column(name = "total_working_days", nullable = false)
	private Integer totalWorkingDays;
	
}
