package com.institute.controllers.student;

import com.institute.dto.student.StudentAttendanceDto;
import com.institute.dto.student.StudentFeeDto;
import com.institute.security.AuthUtil;
import com.institute.service.student.StudentAttendanceService;
import com.institute.service.student.StudentEntityService;
import com.institute.service.student.StudentFeeService;
import com.institute.service.student.StudentMarksService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/student")
@AllArgsConstructor
public class StudentEntityController {

	private final StudentEntityService studentEntityService;
	private final StudentFeeService studentFeeService;
	private final StudentAttendanceService studentAttendanceService;
	private final StudentMarksService studentMarksService;

	// 📝 Get all notices for logged-in student
	@GetMapping("/notice")
	public ResponseEntity<?> getNoticesForStudents() {
		return ResponseEntity.ok(studentEntityService.getStudentNotices());
	}

	// 💰 Student fee info
	@GetMapping("/fee")
	@Operation(description = "Student fee details")
	public ResponseEntity<?> displayStudentFees() {
		StudentFeeDto studentFee = studentFeeService.displayStudentFee(AuthUtil.getCurrentUserId());
		return ResponseEntity.ok(studentFee);
	}

	// 📊 Dashboard attendance
	@GetMapping("/dashboard/attendance")
	@Operation(description = "Student dashboard attendance")
	public ResponseEntity<?> displayStudentAttendancePercentageDashboard() {
		Optional<StudentAttendanceDto> studentAttendance =
				studentAttendanceService.displayStudentAttendance(AuthUtil.getCurrentUserId());
		return ResponseEntity.ok(studentAttendance);
	}

	// 📅 Full attendance page
	@GetMapping("/attendance")
	@Operation(description = "Student attendance full details")
	public ResponseEntity<?> displayStudentAttendancePercentage() {
		Optional<StudentAttendanceDto> studentAttendance =
				studentAttendanceService.displayStudentAttendance(AuthUtil.getCurrentUserId());
		return ResponseEntity.ok(studentAttendance);
	}

	// 🧪 Dashboard exam marks
	@GetMapping("/dashboard/marks")
	@Operation(description = "Fetch student exam marks for dashboard")
	public ResponseEntity<?> displayStudentMarksDashboard() {
		return ResponseEntity.ok(studentMarksService.getStudentMarks(AuthUtil.getCurrentUserId()));
	}

	// 🧾 All exam marks
	@GetMapping("/exam")
	@Operation(description = "Fetch full exam marks for student")
	public ResponseEntity<?> displayStudentMarks() {
		return ResponseEntity.ok(studentMarksService.getStudentMarks(AuthUtil.getCurrentUserId()));
	}
}
