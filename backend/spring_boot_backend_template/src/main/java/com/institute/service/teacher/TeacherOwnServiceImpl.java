package com.institute.service.teacher;

import org.springframework.stereotype.Service;

import com.institute.dao.AttendanceDao;
import com.institute.dao.TeacherDao;
import com.institute.dto.teacher.TeacherOwnAttendanceDTO;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Service
@Transactional
@Getter
@Setter
@AllArgsConstructor
public class TeacherOwnServiceImpl implements TeacherOwnService {

    private final AttendanceDao attendanceDao;
    private final TeacherDao teacherDao;
    @Override
    public TeacherOwnAttendanceDTO getTeacherAttendance(Long teacherId) {
        return attendanceDao.findByTeacherId(teacherId);
    }

    @Override
    public Long countStudentsByTeacherId(Long teacherId) {
        return teacherDao.countStudentsByTeacherId(teacherId);
    }

    @Override
    public Long countCoursesByTeacherId(Long teacherId) {
        return teacherDao.countCoursesByTeacherId(teacherId);
    }


}
