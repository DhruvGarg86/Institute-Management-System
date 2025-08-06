package com.institute.service.student;

import com.institute.dto.ApiResponse;
import com.institute.dto.student.StudentProfileDto;
import com.institute.dto.student.UpdateStudentProfileDto;

public interface StudentProfileService {
    StudentProfileDto getStudentProfile(Long studentId);
    ApiResponse updateStudentProfile(Long studentId, UpdateStudentProfileDto dto);
}
