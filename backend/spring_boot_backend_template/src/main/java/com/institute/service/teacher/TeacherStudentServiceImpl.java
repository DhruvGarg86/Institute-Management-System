package com.institute.service.teacher;

import com.institute.dao.TeacherDao;
import com.institute.dto.admin.StudentDetailsDTO;
import com.institute.entities.Student;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


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
