package com.institute.service.student;

import java.util.Optional;

import com.institute.dto.student.StudentAttendanceDto;

public interface StudentAttendanceService {
	 Optional<StudentAttendanceDto> displayStudentAttendance(Long studentId);
}
	
		
		
