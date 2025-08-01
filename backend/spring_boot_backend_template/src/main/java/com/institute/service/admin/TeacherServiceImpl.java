package com.institute.service.admin;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

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
// Define or import SubjectDTO and TeacherAttendanceDTO
// import com.institute.dto.teacher.SubjectDTO; // Remove this if SubjectDTO does not exist or is not needed
import com.institute.dto.teacher.TeacherAttendanceDTO;

@Service
@Transactional
public class TeacherServiceImpl implements TeacherService {

	@Autowired
	private final TeacherDao teacherDao;
	private final ModelMapper modelMapper;

	public TeacherServiceImpl(TeacherDao teacherDao, ModelMapper modelMapper) {
		this.teacherDao = teacherDao;
		this.modelMapper = modelMapper;
	}



	@Override
	public ApiResponse addNewTeacher(AddNewTeacherDTO addTeacher) {
		if (teacherDao.existsByEmail(addTeacher.getEmail())) {
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

	public List<TeacherAttendanceDTO> teacherAttendance() {
	    List<Object[]> results = teacherDao.findAllTeachersWithLatestAttendance();

	    return results.stream().map(obj -> {
	        TeacherAttendanceDTO dto = new TeacherAttendanceDTO();
	        dto.setImage((String) obj[0]);
	        dto.setName((String) obj[1]);
	        dto.setEmail((String) obj[2]);
	        dto.setJoiningDate((LocalDate) obj[3]);
	        dto.setPhoneNumber((String) obj[4]);
	        dto.setStatus((Status) obj[5]);
	        dto.setId((Long) obj[6]);                        
	        dto.setAttendancePercentage((BigDecimal) obj[7]); 
	        return dto;
	    }).toList();
	}




	@Override
	public ApiResponse editTeacherById(AdminEditTeacherDTO teacher, Long id) {
		Teacher entity = teacherDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No teacher exist with id: " + id));
		entity.setName(teacher.getName());
		entity.setPhoneNumber(teacher.getPhoneNumber());
		entity.setEmail(teacher.getEmail());
		entity.setPassword(teacher.getPassword());
		entity.setSalary(teacher.getSalary());
		entity.setJoiningDate(teacher.getJoiningDate());
		entity.setAddress(teacher.getAddress());
		entity.setGender(teacher.getGender());
		entity.setStatus(teacher.getStatus());
		entity.setImage(teacher.getImage());

		teacherDao.save(entity);
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

