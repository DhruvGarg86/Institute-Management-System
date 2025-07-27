package com.institute.controllers.student;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute.dto.student.StudentFeeDto;
import com.institute.service.student.StudentFeeService;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class StudentController {
	
	private StudentFeeService studentFeeService;
	
//	.....................................fee controller ...........................................
	@GetMapping("/fee/{studentId}")
	public ResponseEntity<?> displayStudentFees(@PathVariable Long studentId){
		StudentFeeDto studentFee = studentFeeService.displayStudentFee(studentId);
		return ResponseEntity.ok(studentFee);
	}
}
