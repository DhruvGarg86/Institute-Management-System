package com.institute.service.admin;

import java.util.List;

import com.institute.dto.ApiResponse;
import com.institute.dto.admin.SubjectDto;

public interface SubjectService {
	List<SubjectDto> getAllSubjects();
	ApiResponse deleteSubjectsById(Long subjectId);
	ApiResponse addSubject(SubjectDto subject);
	ApiResponse updateSubjectsById(Long subjectId, SubjectDto dto);
	SubjectDto getSubjectById(Long id);
}
