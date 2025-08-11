package com.institute.controllers.teacher;

import com.institute.dao.TeacherDao;
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
    private final TeacherDao teacherDao;

    @GetMapping("/{teacherId}")
    public ResponseEntity<?> getTeacherAttendance(@PathVariable Long teacherId){
        Long tid = teacherDao.findTeacherIdByUserId(teacherId);

        return ResponseEntity.ok(teacherService.findTeacherById(tid));
    }

    @PutMapping("/edit/{teacherId}")
//    Re-using AdminEditTeacherDTO
    public ResponseEntity<?> editTeacher(@RequestBody AdminEditTeacherDTO teacher, @PathVariable Long teacherId){
        Long tid = teacherDao.findTeacherIdByUserId(teacherId);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(teacherService.editTeacherById(teacher, tid));
    }

}
