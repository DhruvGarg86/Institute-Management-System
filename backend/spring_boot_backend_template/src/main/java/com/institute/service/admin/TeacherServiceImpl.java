package com.institute.service.admin;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.institute.dao.LoginDao;
import lombok.AllArgsConstructor;
import com.institute.dto.teacher.TeacherProfileDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.institute.dao.TeacherDao;
import com.institute.dto.AdminEditTeacherDTO;
import com.institute.dto.ApiResponse;
import com.institute.dto.teacher.AddNewTeacherDTO;
import com.institute.dto.teacher.DisplayTeacherDTO;
import com.institute.entities.Teacher;
import com.institute.entities.enums.Status;
import com.institute.exception.customexceptions.ApiException;
import com.institute.exception.customexceptions.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import com.institute.dto.teacher.TeacherAttendanceDTO;

@Service
@Transactional
@AllArgsConstructor
public class TeacherServiceImpl implements TeacherService {

	@Autowired
	private final TeacherDao teacherDao;
	private final ModelMapper modelMapper;
	private final LoginDao loginDao;

	@Override
	public ApiResponse addNewTeacher(AddNewTeacherDTO addTeacher) {
		if (loginDao.existsByEmail(addTeacher.getEmail())) {
			throw new ApiException("Duplicate email");
		}
		Teacher entity = modelMapper.map(addTeacher, Teacher.class);
		teacherDao.save(entity);
		return new ApiResponse("New Teacher Added");
	}
	
	@Override
	public List<DisplayTeacherDTO> displayTeachers() {
		return teacherDao.findByStatus(Status.ACTIVE)
				.stream()
				.map(teacher -> modelMapper.map(teacher, DisplayTeacherDTO.class))
				.toList();
	}

	@Override
	public List<TeacherAttendanceDTO> teacherAttendance() {
	    return teacherDao.findAllTeachersWithLatestAttendance();
	}


	@Override
	public ApiResponse editTeacherById(AdminEditTeacherDTO teacherDto, Long id) {
		Teacher teacher = teacherDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No teacher exist with id: " + id));
		teacher.setName(teacherDto.getName());
		teacher.setPhoneNumber(teacherDto.getPhoneNumber());
		teacher.setSalary(teacherDto.getSalary());
		teacher.setJoiningDate(teacherDto.getJoiningDate());
		teacher.setAddress(teacherDto.getAddress());
		teacher.setGender(teacherDto.getGender());
		teacher.setStatus(teacherDto.getStatus());
		teacher.setImage(teacherDto.getImage());

		if (teacher.getUser() != null) {
			teacher.getUser().setEmail(teacherDto.getEmail());
			teacher.getUser().setPassword(teacherDto.getPassword());
		}

		teacherDao.save(teacher);
		return new ApiResponse("Teacher id : " + id + "successfully updated");			

	}

	@Override
	public TeacherProfileDTO findTeacherById(Long teacherId) {
		Teacher entity = teacherDao.findById(teacherId)
				.orElseThrow(() -> new ResourceNotFoundException("No teacher exist with id: " + teacherId));

		TeacherProfileDTO teacherProfileDTO = modelMapper.map(entity, TeacherProfileDTO.class);

		return teacherProfileDTO;
	}
}

