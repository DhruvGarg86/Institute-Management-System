package com.institute.controllers.teacher;


import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute.dao.TeacherDao;
import com.institute.dto.teacher.TeacherNoticeDTO;
import com.institute.security.JwtUtil;
import com.institute.service.admin.StudentService;
import com.institute.service.teacher.TeacherNoticeService;
import com.institute.service.teacher.TeacherOwnService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/teacher/dashboard")
@AllArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class TeacherDashboardController {

    private final StudentService studentService;
    private final TeacherOwnService teacherOwnService;
    private final TeacherNoticeService teacherNoticeService;
    private final JwtUtil jwtUtil;
    private final TeacherDao teacherDao;

    @GetMapping("/total-attendance/{teacherId}")
    public ResponseEntity<?> getTeacherAttendance(@PathVariable Long teacherId){
        Long tid = teacherDao.findTeacherIdByUserId(teacherId);

        return ResponseEntity.ok(teacherOwnService.getTeacherAttendance(tid));
    }

////    WORKING WITH JWT FROM FRONTEND BUT JWT RETURNS USER_ID
//    @GetMapping("/total-students")
//    public ResponseEntity<?> getNumberOfStudents(@RequestHeader("Authorization") String tokenHeader){
//        try {
//            // Extract token from "Bearer <token>"
//            String token = tokenHeader.startsWith("Bearer ") ? tokenHeader.substring(7) : tokenHeader;
//
//            // Extract teacher ID from JWT
//            Long teacherId = jwtUtil.extractId(token);
//            System.out.println("teacherid: " + teacherId);
//
////            Since we're getting user_id which is in login table
////            we have to run a search in entity's respective table
////            and retrieve its id
//            Long tid = teacherDao.findTeacherIdByUserId(teacherId);
//            // Call service to get student count
//            Long count = teacherOwnService.countStudentsByTeacherId(tid);
//
//            return ResponseEntity.ok(Map.of("status", "success", "data", count));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(Map.of("status", "error", "message", e.getMessage()));
//        }
////        return ResponseEntity.ok(teacherOwnService.countStudentsByTeacherId(Long.parseLong(teacherId)));
//    }

    @GetMapping("/total-students/{teacherId}")
    public ResponseEntity<?> getNumberOfStudents(@PathVariable Long teacherId) {
        Long tid = teacherDao.findTeacherIdByUserId(teacherId);
        System.out.println("YE DEKH " + tid);
        Long count = teacherOwnService.countStudentsByTeacherId(tid);

            return ResponseEntity.ok(Map.of("status", "success", "data", count));
    }

    @GetMapping("/total-courses/{teacherId}")
    public ResponseEntity<?> getNumberOfCourses(@PathVariable Long teacherId){
        Long tid = teacherDao.findTeacherIdByUserId(teacherId);

        return ResponseEntity.ok(teacherOwnService.countCoursesByTeacherId(tid));
    }

    @GetMapping("/topper")
    public ResponseEntity<?> getTopperStudent() {
        return ResponseEntity.ok(studentService.getTopperStudent());
    }

    @GetMapping("/teacher/latest")
    public ResponseEntity<List<TeacherNoticeDTO>> getLatestFiveNoticesForTeacher() {
        return ResponseEntity.ok(teacherNoticeService.getLatestFiveTeacherNotices());
    }

}
