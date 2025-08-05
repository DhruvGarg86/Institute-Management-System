package com.institute.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.institute.dto.admin.SubjectMappingDetailsDTO;
import com.institute.entities.*;

@Repository
public interface CourseSubjectTeacherDao extends JpaRepository<CourseSubjectTeacher, Long> {
    boolean existsByCourseAndSubjectAndTeacher(Course course, Subject subject, Teacher teacher);
    void deleteAllBySubject(Subject subject);
    List<CourseSubjectTeacher> findByCourseIdAndIsDeletedFalse(Long courseId);
    Optional<CourseSubjectTeacher> findByCourseIdAndSubjectIdAndTeacherId(Long courseId, Long subjectId, Long teacherId);
	List<CourseSubjectTeacher> findByTeacherIdAndIsDeletedFalse(Long teacherId);
	List<CourseSubjectTeacher> findBySubjectIdAndIsDeletedFalse(Long subjectId);
	List<CourseSubjectTeacher> findByCourseId(Long courseId);
}
