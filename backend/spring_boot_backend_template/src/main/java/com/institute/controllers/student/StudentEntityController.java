package com.institute.controllers.student;

import com.institute.service.student.StudentEntityService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
@AllArgsConstructor
public class StudentEntityController {

    private final StudentEntityService studentEntityService;

    @GetMapping("/notice")
    public ResponseEntity<?> getNoticesForStudents() {
        return ResponseEntity.ok(studentEntityService.getStudentNotices());
    }
}
