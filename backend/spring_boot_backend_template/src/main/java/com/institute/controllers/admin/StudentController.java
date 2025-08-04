package com.institute.controllers.admin;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.institute.security.AuthUtil;
import com.institute.service.admin.StudentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.Parameter;

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
    @PostMapping(value = "/addStudent", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AddStudentDto> addStudent(
        @Parameter(
            description = "Student JSON object",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AddStudentDto.class))
        )
        @RequestPart("student") AddStudentDto student,

        @Parameter(
            description = "Profile image file",
            content = @Content(mediaType = MediaType.APPLICATION_OCTET_STREAM_VALUE)
        )
        @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        AddStudentDto saved = studentService.addStudent(student, image);
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
