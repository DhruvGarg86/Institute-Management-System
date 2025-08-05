package com.institute.service.admin;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.institute.dao.LoginDao;
import com.institute.dto.teacher.*;
import com.institute.entities.Login;
import com.institute.entities.Student;
import com.institute.entities.enums.Role;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.institute.dao.TeacherDao;
import com.institute.dto.AdminEditTeacherDTO;
import com.institute.dto.ApiResponse;
import com.institute.entities.Teacher;
import com.institute.entities.enums.Status;
import com.institute.exception.customexceptions.ApiException;
import com.institute.exception.customexceptions.ResourceNotFoundException;

import jakarta.transaction.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class TeacherServiceImpl implements TeacherService {

	@Autowired
	private final TeacherDao teacherDao;
	private final ModelMapper modelMapper;
	private final LoginDao loginDao;
	private final PasswordEncoder passwordEncoder;

	@Override
	public ApiResponse addNewTeacher(AddNewTeacherDTO addTeacher) {
		if (loginDao.existsByEmail(addTeacher.getEmail())) {
			throw new ApiException("Duplicate email");
		}

		Teacher teacher = new Teacher();
		teacher.setName(addTeacher.getName());
		teacher.setPhoneNumber(addTeacher.getPhoneNumber());
		teacher.setSalary(addTeacher.getSalary());
		teacher.setJoiningDate(addTeacher.getJoiningDate());
		teacher.setAddress(addTeacher.getAddress());
		teacher.setGender(addTeacher.getGender());
		teacher.setImage(addTeacher.getImage());

		Login login = new Login();
		login.setEmail(addTeacher.getEmail());
		login.setPassword(passwordEncoder.encode(teacher.getEncodedPassword(addTeacher.getName())));
		login.setRole(Role.TEACHER);
		login.setStatus(Status.ACTIVE);
		loginDao.save(login);

		teacher.setUser(login);  // Link Login with Teacher
		teacherDao.save(teacher);
		return new ApiResponse("New Teacher Added");
	}

	@Override
	public List<DisplayTeacherDTO> displayTeachers() {
		return teacherDao.findByStatus(Status.ACTIVE)
				.stream()
				.map(teacher -> {
					DisplayTeacherDTO dto = modelMapper.map(teacher, DisplayTeacherDTO.class);
					if (teacher.getUser() != null) {
						dto.setEmail(teacher.getUser().getEmail());
					}
					return dto;
				})
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
			String newEmail = teacherDto.getEmail();
			String currentEmail = teacher.getUser().getEmail();

			if (!newEmail.equals(currentEmail) && loginDao.existsByEmail(newEmail)) {
				throw new ApiException("Email id already exists");
			}
			else{
				teacher.getUser().setEmail(newEmail);
			}

			teacherDao.save(teacher);
		}
		return new ApiResponse("Teacher id : " + id + " successfully updated");

	}
	@Override
	public TeacherProfileDTO findTeacherById(Long teacherId) {
		Teacher entity = teacherDao.findById(teacherId)
				.orElseThrow(() -> new ResourceNotFoundException("No teacher exist with id: " + teacherId));

		TeacherProfileDTO teacherProfileDTO = modelMapper.map(entity, TeacherProfileDTO.class);

		return teacherProfileDTO;
	}

	@Override
	public ApiResponse softDeleteTeacher(AdminDeleteTeacherDTO teacher, Long id) {
		Teacher entity = teacherDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No teacher exists with id: " + id));
		entity.setStatus(teacher.getStatus());

		if (entity.getUser() != null) {
			entity.getUser().setStatus(teacher.getStatus());
		}

		teacherDao.save(entity);
		return new ApiResponse("Teacher id: " + id + " deleted successfully");
	}
}

