package com.institute.service.admin;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.institute.dao.CourseDao;
import com.institute.dao.CourseSubjectTeacherDao;
import com.institute.dao.SubjectDao;
import com.institute.dao.TeacherDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.admin.CourseDto;
import com.institute.dto.admin.CourseSubjectTeacherDTO;
import com.institute.entities.Course;
import com.institute.entities.CourseSubjectTeacher;
import com.institute.entities.Subject;
import com.institute.entities.Teacher;
import com.institute.entities.enums.Status;
import com.institute.exception.customexceptions.ApiException;
import com.institute.exception.customexceptions.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

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
    public ApiResponse addCourse(@Valid CourseDto courseDto) {
        Course course = modelMapper.map(courseDto, Course.class);
        course.setDeleted(false);
        Set<CourseSubjectTeacher> cstSet = cstMapping(courseDto.getCourseSubjectTeachers(), course);
        course.setCourseSubjectTeachers(cstSet);
        courseDao.save(course);
        return new ApiResponse("Course added successfully.");
    }

    @Override
    public ApiResponse updateCoursesById(Long courseId, @Valid CourseDto dto) {
        Course course = courseDao.findByIdAndIsDeletedFalse(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course ID not found or it has been deleted: " + courseId));

        modelMapper.map(dto, course);

        List<CourseSubjectTeacher> existingMappings = courseSubjectTeacherDao.findByCourseIdAndIsDeletedFalse(courseId);
        existingMappings.forEach(mapping -> mapping.setDeleted(true));

        Set<CourseSubjectTeacher> csts = cstMapping(dto.getCourseSubjectTeachers(), course);
        course.getCourseSubjectTeachers().addAll(csts);

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
        mappings.forEach(mapping -> mapping.setDeleted(true));

        return new ApiResponse("Course deleted successfully (soft delete).");
    }

    private Set<CourseSubjectTeacher> cstMapping(List<CourseSubjectTeacherDTO> cstDtos, Course course) {
        Set<Long> subjectIds = new HashSet<>();
        Set<Long> teacherIds = new HashSet<>();
        Set<CourseSubjectTeacher> cstSet = new HashSet<>();

        for (CourseSubjectTeacherDTO cstDto : cstDtos) {
            Long subjectId = cstDto.getSubjectId();
            Long teacherId = cstDto.getTeacherId();

            if (!subjectDao.existsById(subjectId)) {
                throw new ResourceNotFoundException("Subject ID not found: " + subjectId);
            }

            if (!teacherDao.existsById(teacherId)) {
                throw new ResourceNotFoundException("Teacher ID not found: " + teacherId);
            }

            if (!teacherIds.add(teacherId)) {
                throw new ApiException("Teacher ID " + teacherId + " is already assigned to a subject in this course.");
            }

            if (!subjectIds.add(subjectId)) {
                throw new ApiException("Subject ID " + subjectId + " is already assigned to a teacher in this course.");
            }

            Subject subject = subjectDao.findById(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with ID: " + subjectId));

            Teacher teacher = teacherDao.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with ID: " + teacherId));

            CourseSubjectTeacher cst = new CourseSubjectTeacher();
            cst.setCourse(course);
            cst.setSubject(subject);
            cst.setTeacher(teacher);
            cst.setDeleted(false);

            cstSet.add(cst);
        }

        return cstSet;
    }
}
