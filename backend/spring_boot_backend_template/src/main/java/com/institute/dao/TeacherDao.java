package com.institute.dao;

import com.institute.dto.AdminEditTeacherDTO;
import com.institute.entities.Teacher;
import com.institute.entities.enums.Status;
<<<<<<< HEAD
=======
import org.springframework.data.jpa.repository.JpaRepository;
>>>>>>> sahilbranch

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherDao extends JpaRepository<Teacher, Long> {
<<<<<<< HEAD

	boolean existsByEmail(String email);

	List<Teacher> findByStatus(Status status);
	
	Optional<Teacher> findById(Long id);
	  
	@Query("""
			   SELECT t.image, t.name, t.email, t.joiningDate, t.phoneNumber, t.status, t.id, a.attendancePercentage
			   FROM Teacher t 
			   LEFT JOIN Attendance a ON a.teacher.id = t.id 
			   WHERE t.status = 'ACTIVE'
			""")
	List<Object[]> findAllTeachersWithLatestAttendance();

=======
    long countByStatus(Status status);
>>>>>>> sahilbranch
}
