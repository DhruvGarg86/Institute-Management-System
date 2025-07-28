package com.institute.service.admin;

import java.util.List;

import com.institute.dto.AddNewTeacherDTO;
import com.institute.dto.AdminEditTeacherDTO;
import com.institute.dto.ApiResponse;
import com.institute.dto.DisplayTeacherDTO;
import com.institute.dto.TeacherAttendanceDTO;

public interface TeacherService {
	ApiResponse addNewTeacher(AddNewTeacherDTO addTeacher);

	List<DisplayTeacherDTO> displayTeachers();

	List<TeacherAttendanceDTO> teacherAttendance();

	ApiResponse editTeacherById(AdminEditTeacherDTO teacher, Long id);

}
