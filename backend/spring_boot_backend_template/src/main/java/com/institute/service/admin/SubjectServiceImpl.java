package com.institute.service.admin;

import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.institute.dao.SubjectDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.SubjectDto;
import com.institute.entities.Subject;
import com.institute.entities.enums.Status;
import com.institute.exception.customexceptions.ApiException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Service
@Transactional
@AllArgsConstructor
@Getter
@Setter
public class SubjectServiceImpl implements SubjectService{
	
	private final SubjectDao subjectDao;
	private final ModelMapper modelMapper;

	@Override
	public List<SubjectDto> getAllSubjects() {
		return subjectDao.findAll()
				.stream()
				.map(Subject -> modelMapper.map(Subject, SubjectDto.class))// entity -> dto conversion
				.toList();	
	}

	@Override
	public ApiResponse deleteSubjectsById(Long subjectId) {
		
		return null;
	}

	@Override
	public ApiResponse updateSubjectsById(Long subjectId) {
		
		return null;
	}

	@Override
	public ApiResponse addSubject(SubjectDto subject) {
		if(subjectDao.existsByName(subject.getName()))
			throw new ApiException("duplicate subjects added");// duplicate subjects validation
		Subject entity = modelMapper.map(subject, Subject.class);// dto -> entity
		entity.setStatus(Status.ACTIVE);
		Subject save = subjectDao.save(entity);// persisting/adding subject in the database 
		return new ApiResponse("new subject added" + save.getId());
	}

}
