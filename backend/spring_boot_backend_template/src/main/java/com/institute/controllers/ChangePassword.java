package com.institute.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute.dto.ChangePasswordRequestDto;
import com.institute.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth/changePassword")
public class ChangePassword {

    @Autowired
    private AuthService authService;

    @Operation(summary = "Change user password")
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequestDto dto) {
        return ResponseEntity.ok(authService.changePassword(dto));
    }
}
