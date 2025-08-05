package com.institute.service.teacher;

import java.util.List;

import org.springframework.stereotype.Service;

import com.institute.dao.TeacherDao;
import com.institute.dto.admin.StudentDetailsDTO;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Service
@Transactional
@Getter
@Setter
@AllArgsConstructor
public class TeacherStudentServiceImpl implements TeacherStudentService{

    private final TeacherDao teacherDao;


    @Override
    public List<StudentDetailsDTO> getStudentsByTeacher(Long teacherId) {
        return teacherDao.findStudentsByTeacherId(teacherId);
    }


}
