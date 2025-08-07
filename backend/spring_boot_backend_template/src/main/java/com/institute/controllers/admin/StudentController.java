package com.institute.controllers.admin;

import java.util.List;

import com.institute.dto.admin.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    
    @GetMapping("/studentDetails/{id}")
    public ResponseEntity<?> getStudentDetailsById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentDetailsById(id));
    }

    @DeleteMapping("/deleteStudent/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.deleteStudentById(id));
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

    @PutMapping("/updateFee/{studentId}")
    public ResponseEntity<?> updateFeeByStudentId(@PathVariable Long studentId,@RequestBody FeeUpdateRequest dto) {
        return ResponseEntity.ok(studentService.updateFee(studentId, dto));
    }

    @GetMapping("getSubjects/{studentId}")
    public ResponseEntity<?> getSubjectsByStudentId(@PathVariable Long studentId) {
        List<StudentSubjectsDto> subjects = studentService.getSubjectNamesByStudentId(studentId);
        return ResponseEntity.ok(subjects);
    }

    @PostMapping("/addMarks")
    public ResponseEntity<?> addOrUpdateMarks(@RequestBody MarksRequestDTO dto) {
        return ResponseEntity.ok(studentService.addOrUpdateMarks(dto));
    }
}
