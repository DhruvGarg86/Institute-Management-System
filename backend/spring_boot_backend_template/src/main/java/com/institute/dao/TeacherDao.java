package com.institute.dao;


import com.institute.dto.admin.StudentDetailsDTO;
import com.institute.dto.teacher.TeacherAttendanceDTO;
import com.institute.dto.teacher.TeacherNoticeDTO;
import com.institute.dto.teacher.TeacherStudentDTO;
import com.institute.entities.Student;
import com.institute.entities.Teacher;

import java.util.List;
import java.util.Optional;

import com.institute.entities.enums.Status;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface TeacherDao extends JpaRepository<Teacher, Long> {

	List<Teacher> findAllByOrderByUpdatedAtDesc();

	Optional<Teacher> findById(Long id);

	@Query("SELECT t.id FROM Teacher t WHERE t.user.id = :userId")
	Long findTeacherIdByUserId(Long userId);

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

	@Query("""
    SELECT new com.institute.dto.admin.StudentDetailsDTO(
        s.id,
        s.name,
        s.phoneNumber,
        s.dob,
        s.address,
        s.course.name,
        s.imagePath,
        s.status
    )
    FROM Student s
    JOIN CourseSubjectTeacher cst ON s.course.id = cst.course.id
    WHERE cst.teacher.id = :teacherId AND s.isDeleted = false
""")
	List<StudentDetailsDTO> findStudentsByTeacherId(Long teacherId);

	@Query("SELECT new com.institute.dto.teacher.TeacherNoticeDTO(n.date, n.description, n.title) " +
			"FROM Notice n WHERE n.audience = 'TEACHER' AND n.isDeleted = false")
	List<TeacherNoticeDTO> findAllNoticesForTeacher();

//	FOR TEACHER DASHBOARD. LIMIT TO ONLY 5 NOTICES
@Query("SELECT new com.institute.dto.teacher.TeacherNoticeDTO(n.date, n.description, n.title) " +
		"FROM Notice n WHERE n.audience = 'TEACHER' AND n.isDeleted = false")
	List<TeacherNoticeDTO> findTop2NoticesForTeacher(Pageable pageable);
}
