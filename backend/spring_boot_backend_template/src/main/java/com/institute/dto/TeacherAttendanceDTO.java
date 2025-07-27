package com.institute.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.institute.entities.enums.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherAttendanceDTO {
	private Long id;
	private String image;
	private String name;
	private String email;
	private LocalDate joiningDate;
	private String PhoneNumber;
	private BigDecimal AttendancePercentage;
	private Status status;
}