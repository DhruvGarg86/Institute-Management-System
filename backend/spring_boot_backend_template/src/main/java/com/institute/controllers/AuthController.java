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

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private LoginDao loginRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        Login login = loginRepo.findByEmail(req.getEmail()).get();
        String token = jwtUtil.generateToken(new CustomUserDetails(login), login.getRole().name(),login.getId());

        return ResponseEntity.ok(new AuthResponse(token, login.getRole().name()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        Login login = new Login();
        login.setEmail(req.getEmail());
        login.setPassword(new BCryptPasswordEncoder().encode(req.getPassword()));
        login.setRole(req.getRole());
        loginRepo.save(login);

        return ResponseEntity.ok("User registered");
    }
}
