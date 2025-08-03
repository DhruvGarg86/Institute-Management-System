package com.institute.controllers.admin;

import com.institute.service.admin.DashboardService;
import com.institute.service.admin.StudentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/admin/dashboard")
@AllArgsConstructor
public class DashboardControllers {

    private final DashboardService dashboardService;
    private final StudentService studentService;

    @GetMapping("/totalStudents")
    public ResponseEntity<?> getAllActiveStudents() {
        return ResponseEntity.ok(dashboardService.allStudents());
    }

    @GetMapping("/totalTeachers")
    public ResponseEntity<?> getAllActiveTeachers() {
        return ResponseEntity.ok(dashboardService.allTeachers());
    }

    @GetMapping("/totalCourses")
    public ResponseEntity<?> getAllActiveCourses() {
        return ResponseEntity.ok(dashboardService.allCourses());
    }

    @GetMapping("/sendNotice")
    public ResponseEntity<?> latestNotice() {
        return ResponseEntity.ok(dashboardService.getLatestNotice());
    }

    @GetMapping("/topper")
    public ResponseEntity<?> getTopperStudent() {
        return ResponseEntity.ok(studentService.getTopperStudent());
    }
    
}
