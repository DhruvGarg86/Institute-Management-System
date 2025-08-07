package com.institute.controllers.student;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.institute.dto.ApiResponse;
import com.institute.dto.student.StudentProfileDto;
import com.institute.dto.student.UpdateStudentProfileDto;
import com.institute.service.student.StudentProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/student/profile")
@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    @GetMapping("/{studentId}")
    public ResponseEntity<StudentProfileDto> getProfile(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentProfileService.getStudentProfile(studentId));
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<ApiResponse> updateProfile(@PathVariable Long studentId,
            @RequestBody UpdateStudentProfileDto dto) {
        return ResponseEntity.ok(studentProfileService.updateStudentProfile(studentId, dto));
    }

    @PutMapping("/{studentId}/upload")
    public ResponseEntity<ApiResponse> updateProfileWithImage(
            @PathVariable Long studentId,
            @RequestParam("name") String name,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("address") String address,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {
        UpdateStudentProfileDto dto = new UpdateStudentProfileDto();
        dto.setName(name);
        dto.setPhoneNumber(phoneNumber);
        dto.setAddress(address);

        return ResponseEntity.ok(studentProfileService.updateStudentProfileWithImage(studentId, dto, imageFile));
    }

}
