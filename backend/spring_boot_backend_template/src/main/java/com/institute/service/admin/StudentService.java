package com.institute.service.admin;

import com.institute.dto.ApiResponse;
import com.institute.dto.admin.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudentService {
    List<ActiveStudentsDto> allActiveStudents();
    AddStudentDto addStudent(AddStudentDto studentDTO);
    TopperStudentDTO getTopperStudent();
    List<StudentDetailsDTO> getAllStudentDetails();
    ApiResponse deleteStudentById(Long id);
    StudentMarksResponseDto getStudentWithMarks(Long studentId);
    ApiResponse updateStudent(Long studentId, UpdateStudentRequestDto request);
    List<TopperStudentResponseDto> getTopperStudentsByCourse();
    List<StudentPercentageDto> getAllStudentPercentages();
    List<FeeResponseDto> getAllStudentFeeDetails();
    ApiResponse updateFee(Long studentId, FeeUpdateRequest dto);
}

