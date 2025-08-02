package com.institute.dao;

import java.util.Optional;

import com.institute.dto.teacher.TeacherOwnAttendanceDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.institute.entities.Attendance;

@Repository
public interface AttendanceDao extends JpaRepository<Attendance,Long> {
//	student attendance for dashboard 
	Optional<Attendance> findAttendanceByStudentId(@Param("studentId") Long studentId);

//	Optional<Attendance> findAttendanceByTeacherId(@Param("teacherId") Long teacherId);
	@Query("SELECT new com.institute.dto.teacher.TeacherOwnAttendanceDTO(a.presentDays, a.totalWorkingDays) " +
			"FROM Attendance a WHERE a.teacher.id = :teacherId")
	TeacherOwnAttendanceDTO findByTeacherId(@Param("teacherId") Long teacherId);
}
