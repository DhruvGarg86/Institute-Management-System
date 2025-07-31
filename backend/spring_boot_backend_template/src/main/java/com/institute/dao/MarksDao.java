package com.institute.dao;

import com.institute.entities.Marks;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarksDao extends JpaRepository<Marks, Long> {
	 List<Marks> findByStudentId(Long studentId);
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarksDao extends JpaRepository<Marks, Long> {
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
