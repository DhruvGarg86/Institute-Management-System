package com.institute.service.admin;

import java.util.List;

import com.institute.dto.ApiResponse;
import com.institute.dto.admin.SubjectDisplayDto;
import com.institute.dto.admin.SubjectDto;

public interface SubjectService {
	ApiResponse deleteSubjectsById(Long subjectId);
	ApiResponse addSubject(SubjectDto subject);
	ApiResponse updateSubjectsById(Long subjectId, SubjectDto dto);
	List<SubjectDisplayDto> getAllSubjects();
	SubjectDto getSubjectById(Long id);

}
