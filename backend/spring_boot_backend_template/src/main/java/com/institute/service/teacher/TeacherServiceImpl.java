package com.institute.service.teacher;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.institute.dao.TeacherDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.teacher.AddNewTeacherDTO;
import com.institute.dto.teacher.DisplayTeacherDTO;
import com.institute.entities.Teacher;
import com.institute.entities.enums.Status;
import com.institute.exception.customexceptions.ApiException;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class TeacherServiceImpl implements TeacherService {

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

	@Override
	public List<DisplayTeacherDTO> displayTeachers() {
		return teacherDao.findByStatus(Status.ACTIVE).stream().map(teacher -> modelMapper.map(teacher, DisplayTeacherDTO.class)).toList();
	}

//	@Override
//	public List<TeacherAttendanceDTO> teacherAttendance() {
//		return teacherDao.findAllTeachersWithAttendance();
//	}


}
