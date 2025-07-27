package com.institute.controllers.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.institute.dto.SubjectDto;
import com.institute.service.admin.SubjectService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestControllerAdvice
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class SubjectController {
	
	public final SubjectService subjectService;
	
	@GetMapping("/display-subject")
	public ResponseEntity<?> DisplayAllSubjects(){
		List<SubjectDto> subjects = subjectService.getAllSubjects();
		if(subjects.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity.ok(subjects);
		
	}
	
	@PostMapping("/add-subject")
	@Operation(description = "add new subject")
	public ResponseEntity<?> addNewSubject(@RequestBody SubjectDto subjectDto ){
		return ResponseEntity
				.status(HttpStatus.CREATED)// adding appropriate http status code -> 201
				.body(subjectService.addSubject(subjectDto)); // adding new subject in database
	}
	
}
