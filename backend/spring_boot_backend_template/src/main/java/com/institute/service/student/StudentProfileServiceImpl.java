package com.institute.service.student;

import com.institute.dao.StudentDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.student.StudentProfileDto;
import com.institute.dto.student.UpdateStudentProfileDto;
import com.institute.entities.Student;
import com.institute.exception.customexceptions.ApiException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@AllArgsConstructor
public class StudentProfileServiceImpl implements StudentProfileService{

    private final StudentDao studentDao;

    @Override
    public StudentProfileDto getStudentProfile(Long studentId) {
        Student student = studentDao.findById(studentId)
                .orElseThrow(() -> new ApiException("Student not found with ID: " + studentId));

        StudentProfileDto dto = new StudentProfileDto();
        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setEmail(student.getUser().getEmail());
        dto.setPhoneNumber(student.getPhoneNumber());
        dto.setAddress(student.getAddress());
        dto.setImagePath(student.getImagePath());
        dto.setCourseName(student.getCourse().getName());

        return dto;
    }

    @Override
    public ApiResponse updateStudentProfile(Long studentId, UpdateStudentProfileDto dto) {
        Student student = studentDao.findById(studentId)
                .orElseThrow(() -> new ApiException("Student not found with ID: " + studentId));

        student.setName(dto.getName());
        student.setPhoneNumber(dto.getPhoneNumber());
        student.setAddress(dto.getAddress());
        student.setImagePath(dto.getImagePath());

        studentDao.save(student);
        return new ApiResponse("Profile updated successfully");
    }
}
