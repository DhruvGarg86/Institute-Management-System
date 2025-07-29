package com.institute.service.admin;

import java.util.List;

import com.institute.dto.AdminEditTeacherDTO;
import com.institute.dto.ApiResponse;
import com.institute.dto.teacher.AddNewTeacherDTO;
import com.institute.dto.teacher.DisplayTeacherDTO;
import com.institute.dto.teacher.TeacherAttendanceDTO;

public interface TeacherService {
	ApiResponse addNewTeacher(AddNewTeacherDTO addTeacher);

	List<DisplayTeacherDTO> displayTeachers();

	List<TeacherAttendanceDTO> teacherAttendance();

	ApiResponse editTeacherById(AdminEditTeacherDTO teacher, Long id);

}
