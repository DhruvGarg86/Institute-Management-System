package com.institute.service.admin;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.institute.dao.TeacherDao;
import com.institute.dto.AddNewTeacherDTO;
import com.institute.dto.ApiResponse;
import com.institute.dto.DisplayTeacherDTO;
import com.institute.dto.DisplayTeacherSubjectDTO;
import com.institute.dto.TeacherAttendanceDTO;
import com.institute.entities.Subject;
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
		return teacherDao.findByStatus(Status.ACTIVE)
				.stream()
				.map(teacher -> {
					DisplayTeacherDTO dto = modelMapper.map(teacher, DisplayTeacherDTO.class);

					// Map all subjects of each teacher record
					List<DisplayTeacherSubjectDTO> subjectDTOs = teacher.getSubjects()
							.stream()
							.map(subject -> modelMapper.map(subject, DisplayTeacherSubjectDTO.class))
							.toList();

					dto.setSubjects(subjectDTOs);
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
	        dto.setId((Long)obj[6]);
	        dto.setAttendancePercentage((BigDecimal) obj[7]);

	        return dto;
	    }).toList();
	}


	


}
