package com.institute.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.math.BigDecimal;


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
	//Flag = 0 -> teacher

	@Column(name = "attendance_percentage", precision = 5, scale = 2, nullable = false)
	// Setting default value to zero for any newly added student , teacher
	private BigDecimal attendancePercentage = BigDecimal.ZERO; 

	@OneToOne
	@JoinColumn(name = "student_id", unique = true)
	private Student student;

	@OneToOne
	@JoinColumn(name = "teacher_id", unique = true)
	private Teacher teacher;

}
