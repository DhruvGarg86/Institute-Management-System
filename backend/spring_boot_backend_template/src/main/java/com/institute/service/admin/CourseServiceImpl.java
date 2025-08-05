package com.institute.service.admin;

import java.util.*;
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
        Set<CourseSubjectTeacher> cstSet = cstMapping(courseDto.getCourseSubjectTeachers(), course, false);
        course.setCourseSubjectTeachers(cstSet);
        courseDao.save(course);
        return new ApiResponse("Course added successfully.");
    }

    @Override
    public ApiResponse updateCoursesById(Long courseId, @Valid CourseDto dto) {
        Course course = courseDao.findByIdAndIsDeletedFalse(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course ID not found or it has been deleted: " + courseId));

        Status previousStatus = course.getStatus(); // Detect reactivation
        modelMapper.map(dto, course);

        // Soft-delete existing mappings
        List<CourseSubjectTeacher> existingMappings = courseSubjectTeacherDao.findByCourseIdAndIsDeletedFalse(courseId);
        existingMappings.forEach(mapping -> mapping.setDeleted(true));
        courseSubjectTeacherDao.saveAll(existingMappings);

        boolean reactivating = (previousStatus == Status.INACTIVE && course.getStatus() == Status.ACTIVE);

        Set<CourseSubjectTeacher> updatedMappings = cstMapping(dto.getCourseSubjectTeachers(), course, reactivating);
        course.setCourseSubjectTeachers(updatedMappings);

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
        courseSubjectTeacherDao.saveAll(mappings);

        return new ApiResponse("Course deleted successfully (soft delete).");
    }

    /**
     * Builds course-subject-teacher mappings.
     * - On course creation, throws error if subject or teacher is soft-deleted.
     * - On reactivation, silently skips such mappings.
     */
    private Set<CourseSubjectTeacher> cstMapping(List<CourseSubjectTeacherDTO> cstDtos, Course course, boolean reactivating) {
        Set<String> seenPairs = new HashSet<>();
        Set<CourseSubjectTeacher> cstSet = new HashSet<>();

        for (CourseSubjectTeacherDTO dto : cstDtos) {
            Long subjectId = dto.getSubjectId();
            Long teacherId = dto.getTeacherId();

            Subject subject = subjectDao.findById(subjectId)
                    .orElseThrow(() -> new ResourceNotFoundException("Subject not found: " + subjectId));
            Teacher teacher = teacherDao.findById(teacherId)
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found: " + teacherId));

            // Validate against deleted subject/teacher
            if (subject.isDeleted() || teacher.isDeleted()) {
                if (reactivating) {
                    continue; // skip silently
                } else {
                    throw new ApiException("Subject or Teacher is deleted: subject " + subjectId + ", teacher " + teacherId);
                }
            }

            // Prevent duplicate subject-teacher pair
            String key = subjectId + "-" + teacherId;
            if (!seenPairs.add(key)) {
                throw new ApiException("Duplicate subject-teacher pair: subject " + subjectId + ", teacher " + teacherId);
            }

            Optional<CourseSubjectTeacher> existing = courseSubjectTeacherDao
                    .findByCourseIdAndSubjectIdAndTeacherId(course.getId(), subjectId, teacherId)
                    .filter(cst -> !cst.isDeleted());

            CourseSubjectTeacher cst = existing.orElseGet(CourseSubjectTeacher::new);
            cst.setCourse(course);
            cst.setSubject(subject);
            cst.setTeacher(teacher);
            cst.setDeleted(false);

            cstSet.add(cst);
        }

        return cstSet;
    }
}
