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

	public TeacherAttendanceDTO(String image, String name, String email, LocalDate joiningDate,
								String phoneNumber, Status status, Long id, BigDecimal attendancePercentage) {
		this.image = image;
		this.name = name;
		this.email = email;
		this.joiningDate = joiningDate;
		this.phoneNumber = phoneNumber;
		this.status = status;
		this.id = id;
		this.attendancePercentage = attendancePercentage;
	}
}