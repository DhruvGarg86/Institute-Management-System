package com.institute.dao;

import com.institute.entities.Course;
import com.institute.entities.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
import java.util.Optional;
public interface CourseDao extends JpaRepository<Course,Long> {
    long countByStatus(Status status);
    Optional<Course> findByName(String name);

}
