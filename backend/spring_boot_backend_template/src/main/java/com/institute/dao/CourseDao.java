package com.institute.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.institute.entities.Course;
import com.institute.entities.enums.Status;

@Repository
public interface CourseDao extends JpaRepository<Course,Long> {
    long countByStatus(Status status);
    Optional<Course> findByName(String name);
    List<Course> findAllByIsDeletedFalse();
    Optional<Course> findByIdAndIsDeletedFalse(Long id);
}
