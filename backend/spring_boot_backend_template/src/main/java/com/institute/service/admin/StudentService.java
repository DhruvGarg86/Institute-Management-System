package com.institute.service.admin;

import java.util.List;
import java.util.Optional;

import com.institute.dto.ApiResponse;
import com.institute.dto.admin.ActiveStudentsDto;
import com.institute.dto.admin.AddStudentDto;
import com.institute.dto.admin.FeeResponseDto;
import com.institute.dto.admin.FeeUpdateRequest;
import com.institute.dto.admin.StudentDetailsDTO;
import com.institute.dto.admin.StudentMarksResponseDto;
import com.institute.dto.admin.StudentPercentageDto;
import com.institute.dto.admin.TopperStudentDTO;
import com.institute.dto.admin.TopperStudentResponseDto;
import com.institute.dto.admin.UpdateStudentRequestDto;

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
	Optional<AddStudentDto> getStudentDetailsById(Long id);
}

