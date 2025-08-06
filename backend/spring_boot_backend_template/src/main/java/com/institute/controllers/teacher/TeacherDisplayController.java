package com.institute.controllers.teacher;

import com.institute.service.admin.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teacher/display")
@AllArgsConstructor
public class TeacherDisplayController {

    private final TeacherService teacherService;

    @GetMapping("/display-teachers")
    @Operation(summary="Teacher-DisplayAllTeacher")
    public ResponseEntity<?> displayAllTeachers(){
        return ResponseEntity.ok(teacherService.displayTeachers());
    }
}
