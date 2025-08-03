package com.institute.service.teacher;

import com.institute.dto.teacher.TeacherOwnAttendanceDTO;

import java.util.Optional;

public interface TeacherOwnService {
    TeacherOwnAttendanceDTO getTeacherAttendance(Long teacherId);
    Long countStudentsByTeacherId(Long teacherId);
    Long countCoursesByTeacherId(Long teacherId);

}
