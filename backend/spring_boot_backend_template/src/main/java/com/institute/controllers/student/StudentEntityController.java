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

	@GetMapping("/notice/{studentId}")
	public ResponseEntity<?> getNoticesForStudents() {
		return ResponseEntity.ok(studentEntityService.getStudentNotices());
	}

	@GetMapping("/fee/{studentId}")
	@Operation(description = "Student fee details")
	public ResponseEntity<?> displayStudentFees(@PathVariable Long studentId) {
		StudentFeeDto studentFee = studentFeeService.displayStudentFee(studentId);
		return ResponseEntity.ok(studentFee);
	}

	// 📊 Dashboard attendance
	@GetMapping("/dashboard/attendance/{studentId}")
	@Operation(description = "Student dashboard attendance")
	public ResponseEntity<?> displayStudentAttendancePercentageDashboard(@PathVariable Long studentId) {
		Optional<StudentAttendanceDto> studentAttendance =
				studentAttendanceService.displayStudentAttendance(studentId);
		return ResponseEntity.ok(studentAttendance);
	}

	// 📅 Full attendance page
	@GetMapping("/attendance/{studentId}")
	@Operation(description = "Student attendance full details")
	public ResponseEntity<?> displayStudentAttendancePercentage(@PathVariable Long studentId) {
		Optional<StudentAttendanceDto> studentAttendance =
				studentAttendanceService.displayStudentAttendance(studentId);
		return ResponseEntity.ok(studentAttendance);
	}

	// 🧪 Dashboard exam marks
	@GetMapping("/dashboard/marks/{studentId}")
	@Operation(description = "Fetch student exam marks for dashboard")
	public ResponseEntity<?> displayStudentMarksDashboard(@PathVariable Long studentId) {
		return ResponseEntity.ok(studentMarksService.getStudentMarks(studentId));
	}

	// 🧾 All exam marks
	@GetMapping("/exam/{studentId}")
	@Operation(description = "Fetch full exam marks for student")
	public ResponseEntity<?> displayStudentMarks(@PathVariable Long studentId) {
		return ResponseEntity.ok(studentMarksService.getStudentMarks(studentId));
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
