package com.institute.dto.teacher;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.institute.entities.enums.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TeacherAttendanceDTO {

	private Long id;
	private String image;
	private String name;
	private String email;
	private LocalDate joiningDate;
	private String phoneNumber;
	private BigDecimal attendancePercentage;
	private Status status;
}