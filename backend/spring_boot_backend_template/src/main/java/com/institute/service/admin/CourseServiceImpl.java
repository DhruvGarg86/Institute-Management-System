package com.institute.service.admin;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
import com.institute.dto.admin.CourseSubjectTeacherResponseDto;
import com.institute.dto.admin.DisplayCourseSubjectTeacherDto;
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
        Status previousStatus = course.getStatus();
        modelMapper.map(dto, course);
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

    @Override
    public ApiResponse updateCourseStatus(Long courseId, Status status) {
        Course course = courseDao.findByIdAndIsDeletedFalse(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        Status oldStatus = course.getStatus();
        if (oldStatus == status) {
            return new ApiResponse("Status is already " + status);
        }
        course.setStatus(status);
        if (oldStatus == Status.INACTIVE && status == Status.ACTIVE) {
            List<CourseSubjectTeacher> mappings = courseSubjectTeacherDao.findByCourseId(courseId);
            boolean modified = false;

            for (CourseSubjectTeacher cst : mappings) {
                if (cst.isDeleted()) {
                    Subject subject = cst.getSubject();
                    Teacher teacher = cst.getTeacher();
                    if (!subject.isDeleted() && !teacher.isDeleted()) {
                        cst.setDeleted(false);
                        modified = true;
                    }
                }
            }
            if (modified) {
                courseSubjectTeacherDao.saveAll(mappings);
            }
        }
        courseDao.save(course);
        return new ApiResponse("Course status updated to " + status);
    }

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
            if (subject.isDeleted() || teacher.isDeleted()) {
                if (reactivating) {
                    continue;
                } else {
                    throw new ApiException("Subject or Teacher is deleted: subject " + subjectId + ", teacher " + teacherId);
                }
            }
            String key = subjectId + "-" + teacherId;
            if (!seenPairs.add(key)) {
                throw new ApiException("Duplicate subject-teacher pair: subject " + subjectId + ", teacher " + teacherId);
            }
            // Look up the mapping regardless of deleted flag
            Optional<CourseSubjectTeacher> existingOpt =
                    courseSubjectTeacherDao.findByCourseIdAndSubjectIdAndTeacherId(course.getId(), subjectId, teacherId);
            CourseSubjectTeacher cst;
            if (existingOpt.isPresent()) {
                // Re-use existing DB row (reactivate it)
                cst = existingOpt.get();
                cst.setDeleted(false);
            } else {
                // create new mapping if none exists in DB
                cst = new CourseSubjectTeacher();
                cst.setCourse(course);
                cst.setSubject(subject);
                cst.setTeacher(teacher);
                cst.setDeleted(false);
            }

            // ensure relationship is set correctly
            cst.setCourse(course);
            cstSet.add(cst);
        }
        return cstSet;
    }

    @Override
    public DisplayCourseSubjectTeacherDto getSubjectAndTeacherByCourseId(Long courseId) {
         courseDao.findByIdAndIsDeletedFalse(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        List<CourseSubjectTeacher> mappings = courseSubjectTeacherDao.findByCourseIdAndIsDeletedFalse(courseId);
        Set<CourseSubjectTeacherResponseDto> mappingDtos = mappings.stream()
                .filter(Objects::nonNull)
                .filter(cst -> !cst.isDeleted())
                .map(cst -> {
                    Subject s = cst.getSubject();
                    Teacher t = cst.getTeacher();
                    return new CourseSubjectTeacherResponseDto(
                            s != null ? s.getId() : null,
                            s != null ? s.getName() : null,
                            t != null ? t.getId() : null,
                            t != null ? t.getName() : null
                    );
                })
                .collect(Collectors.toCollection(LinkedHashSet::new)); // LinkedHashSet preserves insertion order
        DisplayCourseSubjectTeacherDto dto = new DisplayCourseSubjectTeacherDto();
        dto.setMappings(mappingDtos);
        return dto;
    }
}
