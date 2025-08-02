package com.institute.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.institute.entities.Subject;
import com.institute.entities.enums.Status;

@Repository
public interface SubjectDao extends JpaRepository<Subject, Long> {
	//to display all subjects 
	@Query("select s from Subject s")
	List<Subject> listAllSubject();
	
	//derived check method
	boolean existsByName(String subjectName);
	List<Subject> findByStatus(Status status);

	Optional<Subject> findByIdAndIsDeletedFalse(Long subjectId);

	
}
