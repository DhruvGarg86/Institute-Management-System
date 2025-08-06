package com.institute.service.teacher;

import java.util.List;

import com.institute.dto.admin.StudentDetailsDTO;

public interface TeacherStudentService {

    List<StudentDetailsDTO> getStudentsByTeacher(Long teacherId);
}
