package com.institute.dao;

import com.institute.entities.Teacher;
import com.institute.entities.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherDao extends JpaRepository<Teacher, Long> {
    long countByStatus(Status status);
}
