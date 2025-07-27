package com.institute.controllers.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.institute.dto.ApiResponse;
import com.institute.dto.admin.SubjectDto;
import com.institute.service.admin.SubjectService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestControllerAdvice
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class SubjectController {
	
//	 subject apis ----------------------------------------------------------
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
	public ResponseEntity<?> addNewSubject(@Valid @RequestBody SubjectDto subjectDto) {
	    return ResponseEntity.status(HttpStatus.CREATED)
	                         .body(subjectService.addSubject(subjectDto));
	}
	
	@PutMapping("/edit-subject/{subjectId}")
	@Operation(summary = "Update subject", description = "Updates the details of a subject by its ID.")
	public ResponseEntity<?> editSubjectByID(
	        @PathVariable Long subjectId,
	        @Valid @RequestBody SubjectDto dto) {
	    return ResponseEntity.ok(subjectService.updateSubjectsById(subjectId, dto));
	}

	@DeleteMapping("/{subjectId}")
	@Operation(summary = "Soft delete subject", description = "Soft deletes the subject if its status is INACTIVE.")
	public ResponseEntity<?> deleteSubject(@PathVariable Long subjectId) {
	    return ResponseEntity.ok(subjectService.deleteSubjectsById(subjectId));
	}
// ------------------------------------------------------------------------------------------------
		
}
