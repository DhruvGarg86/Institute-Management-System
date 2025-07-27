package com.institute.service.admin;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.institute.dao.CourseDao;
import com.institute.dao.SubjectDao;
import com.institute.dao.TeacherDao;
import com.institute.dao.CourseSubjectTeacherDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.SubjectDto;
import com.institute.dto.CourseSubjectTeacherDTO;
import com.institute.entities.*;
import com.institute.entities.enums.Status;
import com.institute.exception.customexceptions.ApiException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {

    private final SubjectDao subjectDao;
    private final TeacherDao teacherDao;
    private final CourseDao courseDao;
    private final CourseSubjectTeacherDao courseSubjectTeacherDao;
    private final ModelMapper modelMapper;

    // ---------------------- GET ALL ----------------------
    @Override
    public List<SubjectDto> getAllSubjects() {
        return subjectDao.findAll().stream()
                .filter(subject -> subject.getStatus() == Status.ACTIVE)
                .map(subject -> modelMapper.map(subject, SubjectDto.class))
                .toList();
    }

    // ---------------------- ADD SUBJECT ----------------------
    @Override
    public ApiResponse addSubject(SubjectDto dto) {
        if (subjectDao.existsByName(dto.getName()))
            throw new ApiException("Duplicate subject name");

        Subject subject = modelMapper.map(dto, Subject.class);
        subject.setStatus(dto.getStatus() != null ? dto.getStatus() : Status.ACTIVE);
        subjectDao.save(subject);

        return new ApiResponse("New subject added with ID: " + subject.getId());
    }

    // ---------------------- ASSIGN TO COURSE + TEACHER ----------------------
    public ApiResponse assignSubjectToCourseAndTeacher(CourseSubjectTeacherDTO dto) {
        Course course = courseDao.findById(dto.getCourseId())
                .orElseThrow(() -> new ApiException("Invalid course ID"));

        Subject subject = subjectDao.findById(dto.getSubjectId())
                .orElseThrow(() -> new ApiException("Invalid subject ID"));

        Teacher teacher = teacherDao.findById(dto.getTeacherId())
                .orElseThrow(() -> new ApiException("Invalid teacher ID"));

        if (subject.getStatus() != Status.ACTIVE)
            throw new ApiException("Cannot assign an inactive subject.");

        // prevent duplicates
        if (courseSubjectTeacherDao.existsByCourseAndSubjectAndTeacher(course, subject, teacher)) {
            throw new ApiException("This subject is already assigned to this course and teacher.");
        }

        CourseSubjectTeacher link = new CourseSubjectTeacher();
        link.setCourse(course);
        link.setSubject(subject);
        link.setTeacher(teacher);

        course.getCourseSubjectTeachers().add(link);
        subject.getCourseSubjectTeachers().add(link);
        teacher.getCourseSubjectTeachers().add(link);

        return new ApiResponse("Assigned subject to course and teacher successfully.");
    }

    // ---------------------- UPDATE SUBJECT ----------------------
    @Override
    public ApiResponse updateSubjectsById(Long subjectId, SubjectDto dto) {
        Subject subject = subjectDao.findById(subjectId)
                .orElseThrow(() -> new ApiException("Subject not found"));

        if (subject.getStatus() != Status.ACTIVE) {
            throw new ApiException("Cannot update an inactive subject.");
        }

        subject.setName(dto.getName());
        subject.setCode(dto.getCode());
        subject.setDescription(dto.getDescription());

        // Optional: allow status update if needed
        if (dto.getStatus() != null) {
            subject.setStatus(dto.getStatus());
        }

        subjectDao.save(subject);

        return new ApiResponse("Subject updated successfully.");
    }

    // ---------------------- DELETE SUBJECT (Soft Delete) ----------------------
    @Override
    public ApiResponse deleteSubjectsById(Long subjectId) {
        Subject subject = subjectDao.findById(subjectId)
                .orElseThrow(() -> new ApiException("Subject not found"));

        // Prevent deleting ACTIVE subjects
        if (subject.getStatus() == Status.ACTIVE) {
            throw new ApiException("Cannot delete subject: status is ACTIVE. Please mark it as INACTIVE first.");
        }

        // Ensure status is INACTIVE and perform soft delete logic
        if (subject.getStatus() == Status.INACTIVE) {
            subject.setDeleted(true); // Only if you have an `isDeleted` flag
            // Keep status as INACTIVE (do NOT set to null)
            subjectDao.save(subject);
            return new ApiResponse("Subject soft-deleted successfully.");
        }

        return new ApiResponse("Subject is already deleted or status is invalid.");
    }




}
