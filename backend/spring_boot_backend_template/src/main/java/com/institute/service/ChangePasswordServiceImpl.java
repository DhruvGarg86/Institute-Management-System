package com.institute.service;

import jakarta.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.institute.dao.LoginDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.ChangePasswordDto;
import com.institute.dto.EmailDto;
import com.institute.entities.Login;
import com.institute.exception.customexceptions.ApiException;
import com.institute.security.AuthUtil;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ChangePasswordServiceImpl implements ChangePasswordService {

    private final LoginDao loginDao;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ApiResponse verifyEmail(EmailDto dto) {
        boolean exists = loginDao.existsByEmail(dto.getEmail());
        if (!exists) {
            throw new ApiException("Email not found");
        }
        return new ApiResponse(true + "Email verified");
    }

    @Override
    public ApiResponse changePassword(ChangePasswordDto dto) {
        // Get logged-in user's ID from JWT security context
        Long currentUserId = AuthUtil.getCurrentUserId();

        // Fetch user from DB
        Login login = loginDao.findById(currentUserId)
                .orElseThrow(() -> new ApiException("User not found"));

        // Validate old password
        if (!passwordEncoder.matches(dto.getOldPassword(), login.getPassword())) {
            throw new ApiException("Old password is incorrect");
        }

        // Encode and update new password
        login.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        loginDao.save(login);

        return new ApiResponse(true + "Password changed successfully");
    }
}
