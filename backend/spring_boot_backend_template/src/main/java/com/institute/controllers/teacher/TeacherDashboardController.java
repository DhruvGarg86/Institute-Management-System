package com.institute.controllers.teacher;

import com.institute.service.admin.StudentService;
import com.institute.service.admin.TeacherService;
import com.institute.service.teacher.TeacherOwnService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teacher/dashboard")
@AllArgsConstructor
public class TeacherDashboardController {

    private final StudentService studentService;
    private final TeacherOwnService teacherOwnService;

    @GetMapping("/totalAttendance/{teacherId}")
    public ResponseEntity<?> getTeacherAttendance(@PathVariable Integer teacherId){
        return ResponseEntity.ok(teacherOwnService.getTeacherAttendance(Integer.toUnsignedLong(teacherId)));
    }

    @GetMapping("/topper")
    public ResponseEntity<?> getTopperStudent() {
        return ResponseEntity.ok(studentService.getTopperStudent());
    }
}
