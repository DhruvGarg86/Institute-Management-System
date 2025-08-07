package com.institute.service.admin;

import java.util.List;
import java.util.Optional;

import com.institute.dto.ApiResponse;
import com.institute.dto.admin.*;

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
    List<StudentSubjectsDto> getSubjectNamesByStudentId(Long studentId);
    ApiResponse addOrUpdateMarks(MarksRequestDTO dto);
}

