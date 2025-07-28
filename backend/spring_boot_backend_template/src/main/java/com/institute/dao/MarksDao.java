package com.institute.dao;

import com.institute.entities.Marks;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarksDao extends JpaRepository<Marks, Long> {
	 List<Marks> findByStudentId(Long studentId);
}
