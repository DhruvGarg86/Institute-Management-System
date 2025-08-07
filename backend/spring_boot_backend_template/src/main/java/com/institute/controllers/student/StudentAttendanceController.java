package com.institute.controllers.student;

import com.institute.dto.student.StudentAttendanceDto;
import com.institute.service.student.StudentAttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentAttendanceController {

    private final StudentAttendanceService studentAttendanceService;

    @GetMapping("/attendance/{studentId}")
    public ResponseEntity<StudentAttendanceDto> getStudentAttendance(@PathVariable Long studentId) {
        return studentAttendanceService.displayStudentAttendance(studentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
