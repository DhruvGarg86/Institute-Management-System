package com.institute.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


import com.institute.dao.LoginDao;
import com.institute.dto.AuthRequest;
import com.institute.dto.AuthResponse;
import com.institute.dto.RegisterRequest;
import com.institute.entities.Login;
import com.institute.security.CustomUserDetails;
import com.institute.security.JwtUtil;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final LoginDao loginRepo;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        Optional<Login> optionalLogin = loginRepo.findByEmail(req.getEmail());
        if (optionalLogin.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        Login login = optionalLogin.get();
        String token = jwtUtil.generateToken(new CustomUserDetails(login), login.getRole().name(), login.getId());
        return ResponseEntity.ok(new AuthResponse(token, login.getRole().name()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (loginRepo.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        Login login = new Login();
        login.setEmail(req.getEmail());
        login.setPassword(passwordEncoder.encode(req.getPassword()));
        login.setRole(req.getRole());
        loginRepo.save(login);

        return ResponseEntity.ok("User registered successfully");
    }
}
