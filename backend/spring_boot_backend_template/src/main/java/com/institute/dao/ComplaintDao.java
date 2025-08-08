package com.institute.dao;

import com.institute.dto.admin.ComplaintsDto;
import com.institute.entities.Complaints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComplaintDao extends JpaRepository<Complaints, Long> {
    List<Complaints> findByDeletedFalse();

    @Query(value = "SELECT * FROM student_complaints WHERE studentid = :studentId ORDER BY date DESC", nativeQuery = true)
    List<Complaints> findAllComplaintsByStudentId(@Param("studentId") Long studentId);

    Optional<Complaints> findActiveById(Long id);

    @Query("""
    SELECT new com.institute.dto.admin.ComplaintsDto(
        s.name,
        c.name,
        comp.createdAt,
        comp.status,
        comp.description
    )
    FROM Complaints comp
    JOIN comp.student s
    JOIN s.course c
    WHERE comp.id = :id AND comp.deleted = false
""")
    Optional<ComplaintsDto> findDtoById(Long id);
}


