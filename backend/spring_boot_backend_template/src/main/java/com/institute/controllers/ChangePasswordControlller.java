package com.institute.controllers;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.institute.dto.ApiResponse;
import com.institute.dto.ChangePasswordDto;
import com.institute.dto.EmailDto;
import com.institute.service.ChangePasswordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@Validated
@RequiredArgsConstructor
public class ChangePasswordControlller {

    private final ChangePasswordService changePasswordService;

    @PostMapping("/verifyemail")
    public ResponseEntity<?> verifyEmail(
            @Valid @RequestBody EmailDto emailDto) {
        ApiResponse response = changePasswordService.verifyEmail(emailDto);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/changepassword")
    @PreAuthorize("hasAnyRole('STUDENT','TEACHER')")
    public ResponseEntity<?> changePassword(
            @Valid @RequestBody ChangePasswordDto changePasswordDto) {
        ApiResponse response = changePasswordService.changePassword(changePasswordDto);
        return ResponseEntity.ok(response);
    }
}
