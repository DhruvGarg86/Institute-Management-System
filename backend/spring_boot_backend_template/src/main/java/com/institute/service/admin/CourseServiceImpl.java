package com.institute.service.admin;

import com.institute.dao.CourseDao;
import com.institute.dao.CourseSubjectTeacherDao;
import com.institute.dao.SubjectDao;
import com.institute.dao.TeacherDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.admin.CourseDto;
import com.institute.dto.admin.CourseSubjectTeacherDTO;
import com.institute.entities.Course;
import com.institute.entities.CourseSubjectTeacher;
import com.institute.entities.enums.Status;
import com.institute.exception.customexceptions.ApiException;
import com.institute.exception.customexceptions.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final SubjectDao subjectDao;
    private final TeacherDao teacherDao;
    private final CourseDao courseDao;
    private final CourseSubjectTeacherDao courseSubjectTeacherDao;
    private final ModelMapper modelMapper;

    @Override
    public List<CourseDto> getAllCourses() {
        List<Course> courses = courseDao.findAllByIsDeletedFalse();
        return courses.stream()
                .map(course -> {
                    CourseDto dto = modelMapper.map(course, CourseDto.class);

                    List<CourseSubjectTeacherDTO> mappedCSTs = course.getCourseSubjectTeachers().stream()
                            .filter(cst -> !cst.isDeleted())
                            .map(cst -> {
                                CourseSubjectTeacherDTO cstDto = new CourseSubjectTeacherDTO();
                                cstDto.setId(cst.getId());
                                cstDto.setCourseId(cst.getCourse().getId());
                                cstDto.setSubjectId(cst.getSubject().getId());
                                cstDto.setTeacherId(cst.getTeacher().getId());
                                return cstDto;
                            }).collect(Collectors.toList());

                    dto.setCourseSubjectTeachers(mappedCSTs);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public ApiResponse addcourse(@Valid CourseDto courseDto) {
        Course course = modelMapper.map(courseDto, Course.class);
        course.setDeleted(false);

        course.getCourseSubjectTeachers().clear();
        for (CourseSubjectTeacherDTO cstDto : courseDto.getCourseSubjectTeachers()) {

            if (!subjectDao.existsById(cstDto.getSubjectId())) {
                throw new ResourceNotFoundException("Subject ID not found: " + cstDto.getSubjectId());
            }

            if (!teacherDao.existsById(cstDto.getTeacherId())) {
                throw new ResourceNotFoundException("Teacher ID not found: " + cstDto.getTeacherId());
            }

            CourseSubjectTeacher cst = new CourseSubjectTeacher();
            cst.setCourse(course);
            cst.setSubject(subjectDao.findById(cstDto.getSubjectId()).orElseThrow());
            cst.setTeacher(teacherDao.findById(cstDto.getTeacherId()).orElseThrow());
            cst.setDeleted(false);

            course.getCourseSubjectTeachers().add(cst);
        }

        courseDao.save(course);
        return new ApiResponse("Course added successfully.");
    }

    @Override
    public ApiResponse updateCoursesById(Long courseId, @Valid CourseDto dto) {
    	Course course = courseDao.findByIdAndIsDeletedFalse(courseId)
    		    .orElseThrow(() -> new ResourceNotFoundException("Course ID not found or it has been deleted: " + courseId));
        // Update course fields from DTO (excluding subject-teacher mappings)
        course.setName(dto.getName());
        course.setDescription(dto.getDescription());
        course.setDuration(dto.getDuration());
        course.setStartDate(dto.getStartDate());
        course.setEndDate(dto.getEndDate());
        course.setCourseFees(dto.getCourseFees());
        course.setMaxStudents(dto.getMaxStudents());
        course.setStatus(Status.valueOf(dto.getStatus().toUpperCase()));


        // Soft delete old mappings
        List<CourseSubjectTeacher> existingMappings = courseSubjectTeacherDao.findByCourseIdAndIsDeletedFalse(courseId);
        for (CourseSubjectTeacher mapping : existingMappings) {
            mapping.setDeleted(true);
        }

        // Add new mappings
        for (CourseSubjectTeacherDTO cstDto : dto.getCourseSubjectTeachers()) {
            if (!subjectDao.existsById(cstDto.getSubjectId())) {
                throw new ResourceNotFoundException("Subject ID not found: " + cstDto.getSubjectId());
            }

            if (!teacherDao.existsById(cstDto.getTeacherId())) {
                throw new ResourceNotFoundException("Teacher ID not found: " + cstDto.getTeacherId());
            }

            CourseSubjectTeacher existingCst = courseSubjectTeacherDao
            	    .findByCourseIdAndSubjectIdAndTeacherId(course.getId(), cstDto.getSubjectId(), cstDto.getTeacherId())
            	    .orElse(null);

            	if (existingCst != null) {
            	    existingCst.setDeleted(false);
            	    course.getCourseSubjectTeachers().add(existingCst);
            	} else {
            	    CourseSubjectTeacher cst = new CourseSubjectTeacher();
            	    cst.setCourse(course);
            	    cst.setSubject(subjectDao.findById(cstDto.getSubjectId()).orElseThrow());
            	    cst.setTeacher(teacherDao.findById(cstDto.getTeacherId()).orElseThrow());
            	    cst.setDeleted(false);
            	    course.getCourseSubjectTeachers().add(cst);
            	}

        }

        courseDao.save(course);
        return new ApiResponse("Course updated successfully.");
    }


    @Override
    public ApiResponse deleteCourseById(Long courseId) {
        Course course = courseDao.findByIdAndIsDeletedFalse(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        if (course.getStatus() != Status.INACTIVE) {
            throw new ApiException("Only INACTIVE courses can be deleted.");
        }

        course.setDeleted(true);

        List<CourseSubjectTeacher> mappings = courseSubjectTeacherDao.findByCourseIdAndIsDeletedFalse(courseId);
        for (CourseSubjectTeacher mapping : mappings) {
            mapping.setDeleted(true);
        }

        return new ApiResponse("Course deleted successfully (soft delete).");
    }
}
