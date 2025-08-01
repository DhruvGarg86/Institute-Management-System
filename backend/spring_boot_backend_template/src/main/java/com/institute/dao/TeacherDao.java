package com.institute.dao;

import com.institute.dto.AdminEditTeacherDTO;
import com.institute.dto.teacher.TeacherAttendanceDTO;
import com.institute.entities.Teacher;
import com.institute.entities.enums.Status;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.institute.entities.Teacher;
import com.institute.entities.enums.Status;

@Repository
public interface TeacherDao extends JpaRepository<Teacher, Long> {

	List<Teacher> findByStatus(Status status);

	Optional<Teacher> findById(Long id);

	@Query("""
			   SELECT t.image, t.name, t.user.email, t.joiningDate, t.phoneNumber, t.status, t.id, a.attendancePercentage
			   FROM Teacher t
			   LEFT JOIN Attendance a ON a.teacher.id = t.id
			   WHERE t.status = 'ACTIVE'
			""")
	List<TeacherAttendanceDTO> findAllTeachersWithLatestAttendance();

    long countByStatus(Status status);

	@Query("""
        SELECT COUNT(DISTINCT s.id)
        FROM Student s
        JOIN CourseSubjectTeacher cst ON s.course = cst.course
        WHERE cst.teacher.id = :teacherId
        """)
	Long countStudentsByTeacherId(Long teacherId);

	@Query("""
        SELECT COUNT(DISTINCT cst.course.id)
        FROM CourseSubjectTeacher cst
        WHERE cst.teacher.id = :teacherId
        """)
	Long countCoursesByTeacherId(Long teacherId);

}
