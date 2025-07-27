package com.institute.service.teacher;

import java.math.BigDecimal;
import java.time.LocalDate;
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

import jakarta.transaction.Transactional;
// Define or import SubjectDTO and TeacherAttendanceDTO
// import com.institute.dto.teacher.SubjectDTO; // Remove this if SubjectDTO does not exist or is not needed
import com.institute.dto.teacher.TeacherAttendanceDTO;

@Service
@Transactional
public class TeacherServiceImpl implements TeacherService {

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
				.map(teacher -> {
					DisplayTeacherDTO dto = modelMapper.map(teacher, DisplayTeacherDTO.class);
					// If you have a SubjectDTO, map subjects here. Otherwise, remove this block.
					// List<SubjectDTO> subjectDTOs = teacher.getSubjects() != null
					// 		? teacher.getSubjects().stream()
					// 			.map(subject -> modelMapper.map(subject, SubjectDTO.class))
					// 			.toList()
					// 		: List.of();
					// dto.setSubjects(subjectDTOs);
					return dto;
				})
				.toList();
	}

	@Override
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
			dto.setAttendancePercentage((BigDecimal) obj[6]);
			return dto;
		}).toList();
	}
}

