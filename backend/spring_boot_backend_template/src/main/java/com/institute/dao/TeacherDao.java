package com.institute.dao;

import com.institute.dto.admin.StudentDetailsDTO;
import com.institute.dto.teacher.TeacherAttendanceDTO;
import com.institute.dto.teacher.TeacherStudentDTO;
import com.institute.entities.Student;
import com.institute.entities.Teacher;
import com.institute.entities.enums.Status;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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
}
