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

    @GetMapping("/total-attendance/{teacherId}")
    public ResponseEntity<?> getTeacherAttendance(Long teacherId){
        return ResponseEntity.ok(teacherOwnService.getTeacherAttendance(teacherId));
    }

    @GetMapping("/total-students/{teacherId}")
    public ResponseEntity<?> getNumberOfStudents(@PathVariable Long teacherId){
        return ResponseEntity.ok(teacherOwnService.countStudentsByTeacherId(teacherId));
    }

    @GetMapping("/total-courses/{teacherId}")
    public ResponseEntity<?> getNumberOfCourses(@PathVariable Long teacherId){
        return ResponseEntity.ok(teacherOwnService.countCoursesByTeacherId(teacherId));
    }

    @GetMapping("/topper")
    public ResponseEntity<?> getTopperStudent() {
        return ResponseEntity.ok(studentService.getTopperStudent());
    }



}
