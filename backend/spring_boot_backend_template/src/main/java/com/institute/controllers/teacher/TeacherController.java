package com.institute.controllers.teacher;

import com.institute.dto.AddNewTeacherDTO;
import com.institute.entities.Teacher;
import com.institute.service.admin.AddTeacher;

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
	private final AddTeacher teacherService;

	@GetMapping("/ping")
	public String pingTest() {
	    System.out.println("✅ Ping endpoint hit!");
	    return "TeacherController is working!";
	}

	
	@PostMapping("/add-teacher")
	public ResponseEntity<?> addTeacher(@RequestBody AddNewTeacherDTO teacher) {
	    System.out.println("✅ Controller reached: " + teacher);
	    return ResponseEntity.status(HttpStatus.CREATED).body(teacherService.addNewTeacher(teacher));
	}

}
