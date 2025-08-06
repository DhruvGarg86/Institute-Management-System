package com.institute.controllers.student;

import com.institute.dto.student.StudentAttendanceDto;
import com.institute.dto.student.StudentFeeDto;
import com.institute.dto.student.StudentProfileDto;
import com.institute.dto.student.UpdateStudentProfileDto;
import com.institute.security.AuthUtil;
import com.institute.service.student.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

	@GetMapping("/profile/{id}")
	public ResponseEntity<StudentProfileDto> getStudentProfile(@PathVariable Long id) {
		return ResponseEntity.ok(studentProfileService.getStudentProfile(id));
	}

	@PutMapping("/updateProfile/{id}")
	public ResponseEntity<?> updateStudentProfile(
			@PathVariable Long id,
			@Valid @RequestBody UpdateStudentProfileDto dto) {
		return ResponseEntity.ok(studentProfileService.updateStudentProfile(id, dto));
	}
}
