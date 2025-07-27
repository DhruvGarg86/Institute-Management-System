package com.institute.service.admin;

import java.util.List;

import com.institute.dto.ApiResponse;
import com.institute.dto.SubjectDto;
import com.institute.entities.Subject;

public interface SubjectService {
	List<SubjectDto> getAllSubjects();
	ApiResponse deleteSubjectsById(Long subjectId);
	ApiResponse updateSubjectsById(Long subjectId);
	ApiResponse addSubject(SubjectDto subject);
}
