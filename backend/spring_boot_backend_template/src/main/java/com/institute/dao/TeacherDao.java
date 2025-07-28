package com.institute.dao;

import com.institute.entities.Teacher;
import com.institute.entities.enums.Status;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherDao extends JpaRepository<Teacher, Long> {

	boolean existsByEmail(String email);

	List<Teacher> findByStatus(Status status);
  
	@Query("""
			   SELECT t.image, t.name, t.email, t.joiningDate, t.phoneNumber, t.status, a.attendancePercentage
			   FROM Teacher t 
			   LEFT JOIN Attendance a ON a.teacher.id = t.id 
			   WHERE t.status = 'ACTIVE'
			""")
	List<Object[]> findAllTeachersWithLatestAttendance();

}
