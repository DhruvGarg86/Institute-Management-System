package com.institute.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.institute.dto.admin.StudentPercentageDto;
import com.institute.dto.admin.TopperStudentResponseDto;
import com.institute.entities.Student;
import com.institute.entities.enums.Status;

@Repository
public interface StudentDao extends JpaRepository<Student, Long> {

    long countByStatus(Status status);

    List<Student> findByStatusAndIsDeletedFalse(Status status);

    boolean existsByIdAndIsDeletedFalse(Long id);

    Optional<Student> findByIdAndIsDeletedFalse(Long id);

    @Query("""
        SELECT new com.institute.dto.admin.StudentPercentageDto(
            s.id, s.name, c.name,
            (SUM(m.marksObtained * 1.0) / SUM(m.totalMarks)) * 100
        )
        FROM Student s
        JOIN s.course c
        JOIN s.marks m
        WHERE m.status = 'ACTIVE' AND s.status = 'ACTIVE'
        GROUP BY s.id, s.name, c.name
    """)
    List<StudentPercentageDto> findAllStudentsWithPercentage();

    @Query("SELECT s FROM Student s WHERE s.status = :status AND s.fee IS NOT NULL")
    List<Student> findAllActiveStudentsWithFee(Status status);

    Optional<Student> findByIdAndStatus(Long id, Status status);

    // Just get all student percentages with course and image
    @Query("""
        SELECT new com.institute.dto.admin.TopperStudentResponseDto(
            s.name,
            s.imagePath,
            c.name,
            (SUM(m.marksObtained * 1.0) / SUM(m.totalMarks)) * 100
        )
        FROM Student s
        JOIN s.course c
        JOIN s.marks m
        WHERE s.status = 'ACTIVE' AND m.status = 'ACTIVE'
        GROUP BY s.id, s.name, s.imagePath, c.name
    """)
    List<TopperStudentResponseDto> findAllStudentsWithPercentageForTopper();
}
