package com.institute.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.institute.entities.Marks;

@Repository
public interface MarksDao extends JpaRepository<Marks, Long> {
	List<Marks> findByStudentId(Long studentId);

	@Query("""
			    SELECT m
			    FROM Marks m
			    JOIN FETCH m.student s
			    JOIN FETCH s.course c
			    WHERE m.student.id = (
			        SELECT m2.student.id
			        FROM Marks m2
			        GROUP BY m2.student.id
			        ORDER BY SUM(m2.marksObtained) DESC
			    LIMIT 1
			)
			""")
	Optional<Marks> findTopperStudentWithDetails();

}
