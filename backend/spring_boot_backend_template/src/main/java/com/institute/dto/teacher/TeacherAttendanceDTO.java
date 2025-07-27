package com.institute.dto.teacher;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.institute.entities.enums.Status;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TeacherAttendanceDTO {

	private String image;
    private String name;
    private String email;
    private LocalDate joiningDate;
    private String phoneNumber;
    private Status status;
    
    private BigDecimal attendancePercentage;

    
}
