package com.institute.dao;

import com.institute.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherDao extends JpaRepository<Teacher, Long> {
	
	boolean existsByEmail(String email);
}
