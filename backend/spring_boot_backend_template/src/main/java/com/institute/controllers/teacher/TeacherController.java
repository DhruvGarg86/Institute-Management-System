package com.institute.controllers.teacher;

import com.institute.dto.AddNewTeacherDTO;
import com.institute.entities.Teacher;
import com.institute.service.admin.TeacherService;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
	
@RestController
@AllArgsConstructor
@RequestMapping("/admin")
public class TeacherController {
	private final TeacherService teacherService;

	@GetMapping("/display-teachers")
	@Operation(summary="Admin-teacher-DisplayAllTeacher")
	public ResponseEntity<?> displayAllTeachers(){
		return ResponseEntity.ok(teacherService.displayTeachers());
	}

	
	@PostMapping("/add-teacher")
	public ResponseEntity<?> addTeacher(@RequestBody AddNewTeacherDTO teacher) {
	    return ResponseEntity.status(HttpStatus.CREATED).body(teacherService.addNewTeacher(teacher));
	}
	
	@GetMapping("/teacher-attendance")
	public ResponseEntity<?> displayAllTeacherAttendance(){
		return ResponseEntity.ok(teacherService.teacherAttendance());
	}
}
