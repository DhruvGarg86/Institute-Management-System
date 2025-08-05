package com.institute.controllers.admin;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute.dto.admin.AddStudentDto;
import com.institute.dto.admin.FeeUpdateRequest;
import com.institute.dto.admin.StudentPercentageDto;
import com.institute.dto.admin.TopperStudentResponseDto;
import com.institute.dto.admin.UpdateStudentRequestDto;
import com.institute.security.AuthUtil;
import com.institute.service.admin.StudentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/admin/student")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/allActiveStudents")
    public ResponseEntity<?> allActiveStudents() {
        return ResponseEntity.ok(studentService.allActiveStudents());
    }

    @Operation(summary = "Add a student with profile image")
    @PostMapping(value = "/addStudent")
    public ResponseEntity<AddStudentDto> addStudent(@RequestBody AddStudentDto dto){
        AddStudentDto saved = studentService.addStudent(dto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/studentDetails")
    public ResponseEntity<?> getAllStudentDetails() {
        return ResponseEntity.ok(studentService.getAllStudentDetails());
    }

    @DeleteMapping("/deleteStudent")
    public ResponseEntity<?> deleteStudent() {
        return ResponseEntity.ok(studentService.deleteStudentById(AuthUtil.getCurrentUserId()));
    }

    @GetMapping("/getMarks/{studentId}")
    public ResponseEntity<?> getStudentMarks(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getStudentWithMarks(studentId));
    }

    @PutMapping("/updateStudent/{studentId}")
    public ResponseEntity<?> updateStudent(@PathVariable Long studentId, @RequestBody UpdateStudentRequestDto request) {
        return ResponseEntity.ok(studentService.updateStudent(studentId, request));
    }

    @GetMapping("/toppers")
    public ResponseEntity<List<TopperStudentResponseDto>> getToppersByCourse() {
        return ResponseEntity.ok(studentService.getTopperStudentsByCourse());
    }

    @GetMapping("/allStudentsPercentage")
    public ResponseEntity<List<StudentPercentageDto>> getStudentPercentages() {
        return ResponseEntity.ok(studentService.getAllStudentPercentages());
    }

    @GetMapping("/allStudentsFeeDetails")
    public ResponseEntity<?> getStudentFeeDetails() {
        return ResponseEntity.ok(studentService.getAllStudentFeeDetails());
    }

    @PutMapping("/updateFee")
    public ResponseEntity<?> updateFeeByStudentId(@RequestBody FeeUpdateRequest dto) {
        return ResponseEntity.ok(studentService.updateFee(AuthUtil.getCurrentUserId(), dto));
    }
}
