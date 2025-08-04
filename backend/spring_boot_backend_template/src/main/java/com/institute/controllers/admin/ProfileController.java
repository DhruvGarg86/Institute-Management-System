package com.institute.controllers.admin;

import com.institute.dto.AdminEditTeacherDTO;
import com.institute.dto.admin.AdminProfileDTO;
import com.institute.security.AuthUtil;
import com.institute.service.admin.AdminService;
import com.institute.service.admin.TeacherService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class ProfileController {

    private final AdminService adminService;
    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id){
        return ResponseEntity.ok(adminService.findAdminById(id));
    }

    @PutMapping("/profile-edit/{id}")
    public ResponseEntity<?> editProfile(@RequestBody AdminProfileDTO admin, @PathVariable Long id){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(adminService.EditAdminProfile(admin, id));
    }

}
