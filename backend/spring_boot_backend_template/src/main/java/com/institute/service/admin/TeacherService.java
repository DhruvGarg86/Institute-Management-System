package com.institute.service.admin;

import java.util.List;

import com.institute.dto.AddNewTeacherDTO;
import com.institute.dto.ApiResponse;
import com.institute.dto.DisplayTeacherDTO;
import com.institute.dto.TeacherAttendanceDTO;
import com.institute.entities.enums.Status;

public interface TeacherService {
	ApiResponse addNewTeacher(AddNewTeacherDTO addTeacher);

	List<DisplayTeacherDTO> displayTeachers();

//	List<TeacherAttendanceDTO> teacherAttendance();

}
