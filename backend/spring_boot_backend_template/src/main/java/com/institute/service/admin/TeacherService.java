package com.institute.service.admin;

import java.util.List;

import com.institute.dto.AdminEditTeacherDTO;
import com.institute.dto.ApiResponse;
import com.institute.dto.teacher.*;

public interface TeacherService {
	ApiResponse addNewTeacher(AddNewTeacherDTO addTeacher);

	List<DisplayTeacherDTO> displayTeachers();

	List<TeacherAttendanceDTO> teacherAttendance();

	ApiResponse editTeacherById(AdminEditTeacherDTO teacher, Long id);

	TeacherProfileDTO findTeacherById(Long teacherId);

	ApiResponse softDeleteTeacher(AdminDeleteTeacherDTO teacher, Long id);
}
