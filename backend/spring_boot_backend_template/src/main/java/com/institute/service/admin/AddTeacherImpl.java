package com.institute.service.admin;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.institute.dao.TeacherDao;
import com.institute.dto.AddNewTeacherDTO;
import com.institute.dto.ApiResponse;
import com.institute.entities.Teacher;
import com.institute.exception.customexceptions.ApiException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AddTeacherImpl implements AddTeacher {

	private final TeacherDao teacherDao;
	private final ModelMapper modelMapper;
	
	@Override
	public ApiResponse addNewTeacher(AddNewTeacherDTO addTeacher) {
	    if(teacherDao.existsByEmail(addTeacher.getEmail())) {
	        throw new ApiException("Duplicate email");
	    }

	    Teacher entity = modelMapper.map(addTeacher, Teacher.class);


	    teacherDao.save(entity);
	    return new ApiResponse("New Teacher Added");
	}


}
