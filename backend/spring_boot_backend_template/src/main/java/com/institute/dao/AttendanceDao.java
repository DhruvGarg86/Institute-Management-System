package com.institute.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.institute.entities.Attendance;

@Repository
public interface AttendanceDao extends JpaRepository<Attendance,Long> {
//	student attendance for dashboard 
	Optional<Attendance> findAttendanceByStudentId(@Param("studentId") Long studentId);
}
