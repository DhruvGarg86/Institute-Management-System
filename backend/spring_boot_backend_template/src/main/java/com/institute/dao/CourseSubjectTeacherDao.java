package com.institute.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.institute.entities.*;

public interface CourseSubjectTeacherDao extends JpaRepository<CourseSubjectTeacher, Long> {
    boolean existsByCourseAndSubjectAndTeacher(Course course, Subject subject, Teacher teacher);
    void deleteAllBySubject(Subject subject);
}
