package com.institute.controllers.admin;

import java.util.List;

import com.institute.dto.admin.SubjectDisplayDto;
import org.springframework.http.HttpStatus;
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

import com.institute.dto.ApiResponse;
import com.institute.dto.admin.SubjectDto;
import com.institute.service.admin.SubjectService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;
    
    @Operation(
        summary = "Get subject-course-teacher and other details",
        description = "Returns a list of subject mappings along with related course and teacher names"
    )
    @GetMapping("/display-subject")
    public ResponseEntity<?> getSubjectMappingDetails() {
        List<SubjectDisplayDto> details = subjectService.getAllSubjects();
        
        if (details.isEmpty()) {
            return ResponseEntity.noContent().build();
        }     
        return ResponseEntity.ok(details);
    }


    @PostMapping("/add-subject")
    @Operation(description = "Add new subject")
    public ResponseEntity<?> addNewSubject(@Valid @RequestBody SubjectDto subjectDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(subjectService.addSubject(subjectDto));
    }

    @PutMapping("/edit-subject/{subjectId}")
    @Operation(summary = "Update subject", description = "Updates the details of a subject by its ID.")
    public ResponseEntity<?> editSubjectById(
            @PathVariable Long subjectId,
            @Valid @RequestBody SubjectDto dto) {
        return ResponseEntity.ok(subjectService.updateSubjectsById(subjectId, dto));
    }

    @DeleteMapping("/delete-subject/{subjectId}")
    @Operation(summary = "Soft delete subject", description = "Soft deletes the subject if its status is INACTIVE.")
    public ResponseEntity<ApiResponse> deleteSubjectById(@PathVariable Long subjectId) {
        ApiResponse response = subjectService.deleteSubjectsById(subjectId);
        return ResponseEntity.ok(response);
    }
    
	@GetMapping("/getSubjectById/{id}")
	public ResponseEntity<SubjectDto> getSubjectById(@PathVariable Long id) {
		SubjectDto subject = subjectService.getSubjectById(id);
		return ResponseEntity.ok(subject);
	}

	
}
