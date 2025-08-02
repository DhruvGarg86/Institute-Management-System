package com.institute.controllers.teacher;

import com.institute.security.AuthUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute.service.admin.StudentService;
import com.institute.service.teacher.TeacherOwnService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/teacher/dashboard")
@AllArgsConstructor
public class TeacherDashboardController {

    private final StudentService studentService;
    private final TeacherOwnService teacherOwnService;

    @GetMapping("/total-attendance")
    public ResponseEntity<?> getTeacherAttendance(){
        return ResponseEntity.ok(teacherOwnService.getTeacherAttendance(AuthUtil.getCurrentUserId()));
    }

    @GetMapping("/total-students")
    public ResponseEntity<?> getNumberOfStudents(){
        return ResponseEntity.ok(teacherOwnService.countStudentsByTeacherId(AuthUtil.getCurrentUserId()));
    }

    @GetMapping("/total-courses")
    public ResponseEntity<?> getNumberOfCourses(){
        return ResponseEntity.ok(teacherOwnService.countCoursesByTeacherId(AuthUtil.getCurrentUserId()));
    }

    @GetMapping("/topper")
    public ResponseEntity<?> getTopperStudent() {
        return ResponseEntity.ok(studentService.getTopperStudent());
    }



}
