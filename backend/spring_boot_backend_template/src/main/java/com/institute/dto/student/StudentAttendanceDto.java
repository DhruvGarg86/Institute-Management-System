package com.institute.dto.student;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentAttendanceDto {
	
	private Integer studentId;
	
	private Integer presentDays;
	
	private Integer absentDays;

	private Integer totalWorkingDays;
	
	private BigDecimal attendancePercentage;
}
