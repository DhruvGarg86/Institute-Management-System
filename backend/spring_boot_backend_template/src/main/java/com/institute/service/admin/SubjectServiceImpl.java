package com.institute.service.admin;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.institute.dao.CourseDao;
import com.institute.dao.SubjectDao;
import com.institute.dao.TeacherDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.SubjectDto;
import com.institute.entities.Course;
import com.institute.entities.Subject;
import com.institute.entities.Teacher;
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
	private final TeacherDao teacherDao;
	private final CourseDao courseDao;
	private final ModelMapper modelMapper;

	@Override
	public List<SubjectDto> getAllSubjects() {
		return subjectDao.findAll()
				.stream()
				.map(Subject -> modelMapper.map(Subject, SubjectDto.class))// entity 
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
	public ApiResponse addSubject(SubjectDto dto) {
	    if (subjectDao.existsByName(dto.getName()))
	        throw new ApiException("Duplicate subject");

	    Subject subject = new Subject();
	    subject.setName(dto.getName());
	    subject.setCode(dto.getCode());
	    subject.setDescription(dto.getDescription());
	    subject.setStatus(dto.getStatus() != null ? dto.getStatus() : Status.ACTIVE);

	    // Set teacher if teacherId is provided
	    if (dto.getTeacherId() != null) {
	        Teacher teacher = teacherDao.findById(dto.getTeacherId())
	            .orElseThrow(() -> new ApiException("Invalid teacher ID"));
	        subject.setTeacher(teacher);
	    }

	    // Set courses if courseIds are provided
	    if (dto.getCourseIds() != null && !dto.getCourseIds().isEmpty()) {
	        Set<Course> courses = new HashSet<>();
	        for (Long id : dto.getCourseIds()) {
	            Course course = courseDao.findById(id)
	                .orElseThrow(() -> new ApiException("Invalid course ID: " + id));
	            courses.add(course);
	        }
	        subject.setCourses(courses);
	    }

	    subjectDao.save(subject);
	    return new ApiResponse("New subject added with ID " + subject.getId());
	}



}
