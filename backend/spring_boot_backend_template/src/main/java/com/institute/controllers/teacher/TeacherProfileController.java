package com.institute.controllers.teacher;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute.dto.AdminEditTeacherDTO;
import com.institute.service.admin.TeacherService;

import lombok.AllArgsConstructor;

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
