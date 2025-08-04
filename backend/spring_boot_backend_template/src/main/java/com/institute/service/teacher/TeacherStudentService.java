package com.institute.service.teacher;

import com.institute.dto.admin.StudentDetailsDTO;
import com.institute.entities.Student;

import java.util.List;

public interface TeacherStudentService {

    List<StudentDetailsDTO> getStudentsByTeacher(Long teacherId);
}
