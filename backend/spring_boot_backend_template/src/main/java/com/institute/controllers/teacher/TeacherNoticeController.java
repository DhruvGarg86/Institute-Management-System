package com.institute.controllers.teacher;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute.service.teacher.TeacherNoticeService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/teacher/notices")
@AllArgsConstructor
public class TeacherNoticeController {
    public final TeacherNoticeService teacherNoticeService;

    @GetMapping("/display-notices")
    @Operation(summary = "Teacher-Panel-DisplayAllNotices")
    public ResponseEntity<?> getNotices(){
        return ResponseEntity.ok(teacherNoticeService.getNoticesForTeacher());
    }
}
