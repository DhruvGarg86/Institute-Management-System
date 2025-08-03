package com.institute.controllers.student;

import com.institute.dto.student.StudentAttendanceDto;
import com.institute.dto.student.StudentFeeDto;
import com.institute.security.AuthUtil;
import com.institute.service.student.StudentAttendanceService;
import com.institute.service.student.StudentEntityService;
import com.institute.service.student.StudentFeeService;
import com.institute.service.student.StudentMarksService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
@AllArgsConstructor
public class StudentEntityController {

    private final StudentEntityService studentEntityService;
    private StudentFeeService studentFeeService;
	private final StudentAttendanceService studentAttendanceService;
	private final StudentMarksService studentMarksService;

    @GetMapping("/notice")
    public ResponseEntity<?> getNoticesForStudents() {
        return ResponseEntity.ok(studentEntityService.getStudentNotices());
    }

//	.....................................fee controller ...........................................
	@GetMapping("/fee")
	@Operation(description = "student fee checking ")
	public ResponseEntity<?> displayStudentFees(){
		StudentFeeDto studentFee = studentFeeService.displayStudentFee(AuthUtil.getCurrentUserId());
		return ResponseEntity.ok(studentFee);
	}
	
//	.............student attendance controller for student attendance page and student dashborad .................................. 
	@GetMapping("/dashboard/{studentId}/attendance")
	@Operation(description = "student attendance checking")
	public ResponseEntity<?> displayStudentAttendancePercentageDashboard(@PathVariable Long studentId){
		Optional<StudentAttendanceDto> studentAttendance = studentAttendanceService.displayStudentAttendance(studentId);
		return ResponseEntity.ok(studentAttendance);
	}
	
	@GetMapping("/attendance")
	@Operation(description = "student attendance checking")
	public ResponseEntity<?> displayStudentAttendancePercentage(){
		Optional<StudentAttendanceDto> studentAttendance = studentAttendanceService.displayStudentAttendance(AuthUtil.getCurrentUserId());
		return ResponseEntity.ok(studentAttendance);
	}
	
//	.......................student marks controller for student marks page and student dashboard..........................
	@GetMapping("/dashboard/marks")
    @Operation(description = "Fetch student exam marks by student ID for student dashboard")
    public ResponseEntity<?> displayStudentMarksDashboard() {
        return ResponseEntity.ok(studentMarksService.getStudentMarks(AuthUtil.getCurrentUserId()));
    }
	
	@GetMapping("/exam")
    @Operation(description = "Fetch student exam marks by student ID")
    public ResponseEntity<?> displayStudentMarks() {
        return ResponseEntity.ok(studentMarksService.getStudentMarks(AuthUtil.getCurrentUserId()));
    }
}
