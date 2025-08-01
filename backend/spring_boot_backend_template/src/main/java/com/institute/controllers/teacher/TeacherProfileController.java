package com.institute.controllers.teacher;

import com.institute.dto.AdminEditTeacherDTO;
import com.institute.service.admin.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacher/profile")
@AllArgsConstructor
public class TeacherProfileController {
    private final TeacherService teacherService;
    @GetMapping("/{teacherId}")
    public ResponseEntity<?> getTeacherAttendance(@PathVariable Long teacherId){
        return ResponseEntity.ok(teacherService.findTeacherById(teacherId));
    }

    @PutMapping("/{id}")
//    Re-using AdminEditTeacherDTO
    public ResponseEntity<?> editTeacher(@RequestBody AdminEditTeacherDTO teacher, @PathVariable Long id){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(teacherService.editTeacherById(teacher, id));
    }

}
