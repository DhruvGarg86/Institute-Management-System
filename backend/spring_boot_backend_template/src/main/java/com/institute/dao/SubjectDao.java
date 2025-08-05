package com.institute.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.institute.entities.Subject;

@Repository
public interface SubjectDao extends JpaRepository<Subject, Long> {
	@Query("select s from Subject s")
	List<Subject> listAllSubject();
	boolean existsByName(String subjectName);
	Optional<Subject> findByIdAndIsDeletedFalse(Long subjectId);

	
}
