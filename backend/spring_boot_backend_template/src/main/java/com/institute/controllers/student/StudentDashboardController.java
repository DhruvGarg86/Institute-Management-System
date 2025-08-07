package com.institute.controllers.student;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute.dto.student.StudentMarksDto;
import com.institute.service.student.StudentMarksService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentDashboardController {
    private final StudentMarksService studentMarksService;

    @GetMapping("/marks/{studentId}")
    public ResponseEntity<?> getStudentMarks(@PathVariable Long studentId) {
        StudentMarksDto dto = studentMarksService.getStudentMarks(studentId);
        return ResponseEntity.ok().body(Map.of("data", dto));
    }
}
