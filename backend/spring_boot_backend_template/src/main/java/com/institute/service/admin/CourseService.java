package com.institute.service.admin;

import java.util.List;

import com.institute.dto.ApiResponse;
import com.institute.dto.admin.CourseDto;

import jakarta.validation.Valid;

public interface CourseService {
	
	List<CourseDto> getAllCourses();
	ApiResponse addCourse(@Valid CourseDto courseDto);
	ApiResponse updateCoursesById(Long courseId, @Valid CourseDto dto);
	ApiResponse deleteCourseById(Long courseId);

}
