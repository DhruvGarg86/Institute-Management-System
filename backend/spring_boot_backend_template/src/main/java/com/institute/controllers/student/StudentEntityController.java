package com.institute.controllers.student;

import java.util.List;
import java.util.Optional;

import com.institute.dao.StudentDao;
import com.institute.dto.complaint.DisplayComplaintDto;
import com.institute.service.admin.ComplaintService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute.dto.student.StudentAttendanceDto;
import com.institute.dto.student.StudentFeeDto;
import com.institute.dto.student.StudentProfileDto;
import com.institute.dto.student.UpdateStudentProfileDto;
import com.institute.service.student.StudentAttendanceService;
import com.institute.service.student.StudentEntityService;
import com.institute.service.student.StudentFeeService;
import com.institute.service.student.StudentMarksService;
import com.institute.service.student.StudentProfileService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/student")
@AllArgsConstructor
public class StudentEntityController {

	private final StudentEntityService studentEntityService;
	private final StudentFeeService studentFeeService;
	private final StudentAttendanceService studentAttendanceService;
	private final StudentMarksService studentMarksService;
	private final StudentProfileService studentProfileService;
	private final ComplaintService complaintService;
	private final StudentDao studentDao;

	@GetMapping("/notice")
	public ResponseEntity<?> getNoticesForStudents() {
		return ResponseEntity.ok(studentEntityService.getStudentNotices());
	}

	@GetMapping("/fee/{studentId}")
	@Operation(description = "Student fee details")
	public ResponseEntity<?> displayStudentFees(@PathVariable Long studentId) {
		Long id = studentDao.findStudentByUserId(studentId);

		StudentFeeDto studentFee = studentFeeService.displayStudentFee(id);
		return ResponseEntity.ok(studentFee);
	}

	@GetMapping("/dashboard/attendance/{studentId}")
	@Operation(description = "Student dashboard attendance")
	public ResponseEntity<?> displayStudentAttendancePercentageDashboard(@PathVariable Long studentId) {
		Long id = studentDao.findStudentByUserId(studentId);

		Optional<StudentAttendanceDto> studentAttendance =
				studentAttendanceService.displayStudentAttendance(id);
		return ResponseEntity.ok(studentAttendance);
	}

	@GetMapping("/attendance/{studentId}")
	@Operation(description = "Student attendance full details")
	public ResponseEntity<?> displayStudentAttendancePercentage(@PathVariable Long studentId) {
		Long id = studentDao.findStudentByUserId(studentId);

		Optional<StudentAttendanceDto> studentAttendance =
				studentAttendanceService.displayStudentAttendance(id);
		return ResponseEntity.ok(studentAttendance);
	}

	// 🧪 Dashboard exam marks
	@GetMapping("/dashboard/marks/{studentId}")
	@Operation(description = "Fetch student exam marks for dashboard")
	public ResponseEntity<?> displayStudentMarksDashboard(@PathVariable Long studentId) {
		Long id = studentDao.findStudentByUserId(studentId);
		return ResponseEntity.ok(studentMarksService.getStudentMarks(id));
	}

	@GetMapping("/exam/{studentId}")
	@Operation(description = "Fetch full exam marks for student")
	public ResponseEntity<?> displayStudentMarks(@PathVariable Long studentId) {
		return ResponseEntity.ok(studentMarksService.getStudentMarks(studentId));
	}

	@GetMapping("/profile/{id}")
	public ResponseEntity<StudentProfileDto> getStudentProfile(@PathVariable Long id) {
		Long id1 = studentDao.findStudentByUserId(id);

		return ResponseEntity.ok(studentProfileService.getStudentProfile(id1));
	}

	@PutMapping("/updateProfile/{id}")
	public ResponseEntity<?> updateStudentProfile(
			@PathVariable Long id,
			@Valid @RequestBody UpdateStudentProfileDto dto) {
		Long id1 = studentDao.findStudentByUserId(id);

		return ResponseEntity.ok(studentProfileService.updateStudentProfile(id1, dto));
	}
	@GetMapping("/complaints/{studentId}")
	public List<DisplayComplaintDto> getComplaintsByStudent(@PathVariable Long studentId) {
		Long id = studentDao.findStudentByUserId(studentId);

		return complaintService.getComplaintsByStudent(id);
	}
}
