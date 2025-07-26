package com.institute.dao;

import com.institute.dto.TeacherAttendanceDTO;
import com.institute.entities.Teacher;
import com.institute.entities.enums.Status;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeacherDao extends JpaRepository<Teacher, Long> {

	boolean existsByEmail(String email);
	List<Teacher> findByStatus(Status status);

	@Query("SELECT new com.institute.dto.TeacherAttendanceDTO(t.firstName, t.lastName, t.email, t.phoneNumber, t.address, "
			+ "t.joiningDate, t.status, a.presentDays, a.absentDays, a.totalWorkingDays, a.attendancePercentage) "
			+ "FROM Teacher t LEFT JOIN t.attendance "
			+ "a WHERE t.isDeleted = false AND a.attendanceFlag = 0")
	List<TeacherAttendanceDTO> findAllTeachersWithAttendance();


}
