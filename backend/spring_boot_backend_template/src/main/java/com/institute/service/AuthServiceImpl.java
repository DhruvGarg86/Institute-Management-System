package com.institute.service;

import com.institute.dao.LoginDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.ChangePasswordRequestDto;
import com.institute.entities.Login;
import com.institute.exception.customexceptions.ApiException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@AllArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final LoginDao loginDao;
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public ApiResponse changePassword(ChangePasswordRequestDto dto) {
        Login login = loginDao.findByEmail(dto.getEmail())
                .orElseThrow(() -> new ApiException("User not found with email" ));

        if (!passwordEncoder.matches(dto.getOldPassword(), login.getPassword())) {
            throw new ApiException("Invalid old password");
        }

        login.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        loginDao.save(login);
        return new ApiResponse("Password updated successfully");
    }
}
