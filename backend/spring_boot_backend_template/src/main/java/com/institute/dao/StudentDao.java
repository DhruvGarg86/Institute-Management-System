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
    SELECT new com.institute.dto.admin.TopperStudentResponseDto(
        s.name,
        s.imagePath,
        c.name,
        (SUM(m.marksObtained * 1.0) / SUM(m.totalMarks)) * 100
    )
    FROM Student s
    JOIN s.course c
    JOIN s.marks m
    WHERE s.status = 'ACTIVE'
    GROUP BY c.id, s.id
    HAVING (SUM(m.marksObtained * 1.0) / SUM(m.totalMarks)) = (
        SELECT MAX((SUM(m2.marksObtained * 1.0) / SUM(m2.totalMarks)))
        FROM Student s2
        JOIN s2.course c2
        JOIN s2.marks m2
        WHERE c2.id = c.id AND s2.status = 'ACTIVE'
        GROUP BY s2.id
    )
""")
    List<TopperStudentResponseDto> findTopperStudentsFromEachCourse();

    @Query("""
        SELECT new com.institute.dto.admin.StudentPercentageDto(
            s.id, s.name, c.name,
            (SUM(m.marksObtained) / SUM(m.totalMarks)) * 100
        )
        FROM Student s
        JOIN s.course c
        JOIN s.marks m
        WHERE m.status = 'ACTIVE'
        GROUP BY s.id, s.name, c.name
        """)
    List<StudentPercentageDto> findAllStudentsWithPercentage();

    @Query("SELECT s FROM Student s WHERE s.status = :status AND s.fee IS NOT NULL")
    List<Student> findAllActiveStudentsWithFee(Status status);

    Optional<Student> findByIdAndStatus(Long id, Status status);

}
