package com.institute.service.teacher;

import java.util.List;

import com.institute.dto.ApiResponse;
import com.institute.dto.teacher.AddNewTeacherDTO;
import com.institute.dto.teacher.DisplayTeacherDTO;
import com.institute.entities.enums.Status;

public interface TeacherService {
	ApiResponse addNewTeacher(AddNewTeacherDTO addTeacher);

	List<DisplayTeacherDTO> displayTeachers();

//	List<TeacherAttendanceDTO> teacherAttendance();

}
