package com.institute.controllers.admin;


import java.util.List;

import com.institute.security.AuthUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.institute.dto.admin.AddStudentDto;
import com.institute.dto.admin.FeeUpdateRequest;
import com.institute.dto.admin.StudentPercentageDto;
import com.institute.dto.admin.TopperStudentResponseDto;
import com.institute.dto.admin.UpdateStudentRequestDto;
import com.institute.service.admin.StudentService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin/student")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/allActiveStudents")
    public ResponseEntity<?> allActiveStudents() {
        return ResponseEntity.ok(studentService.allActiveStudents());
    }

    @PostMapping("/addStudent")
    public ResponseEntity<AddStudentDto> addStudent(
            @RequestPart("student") AddStudentDto dto,
            @RequestPart("image") MultipartFile imageFile
    ) {
        AddStudentDto saved = studentService.addStudent(dto, imageFile);
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

    @GetMapping("/getMarks")
    public ResponseEntity<?> getStudentMarks() {
        return ResponseEntity.ok(studentService.getStudentWithMarks(AuthUtil.getCurrentUserId()));
    }

    @PutMapping("/updateStudent")
    public ResponseEntity<?> updateStudent(@RequestBody UpdateStudentRequestDto request) {
        return ResponseEntity.ok(studentService.updateStudent(AuthUtil.getCurrentUserId(), request));
    }

    @GetMapping("/toppers")
    public ResponseEntity<List<TopperStudentResponseDto>> getToppersByCourse() {
        List<TopperStudentResponseDto> toppers = studentService.getTopperStudentsByCourse();
        return ResponseEntity.ok(toppers);
    }

    @GetMapping("/allStudentsPercentage")
    public ResponseEntity<List<StudentPercentageDto>> getStudentPercentages() {
        List<StudentPercentageDto> data = studentService.getAllStudentPercentages();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/allStudentsFeeDetails")
    public ResponseEntity<?> getStudentFeeDetails() {
        return ResponseEntity.ok(studentService.getAllStudentFeeDetails());
    }

    @PutMapping("/updateFee")
    public ResponseEntity<?> updateFeeByStudentId(
                                            @RequestBody FeeUpdateRequest dto) {
        return ResponseEntity.ok(studentService.updateFee(AuthUtil.getCurrentUserId(), dto));
    }

}
