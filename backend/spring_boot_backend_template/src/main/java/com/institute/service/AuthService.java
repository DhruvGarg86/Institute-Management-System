package com.institute.service;

import com.institute.dto.ApiResponse;
import com.institute.dto.ChangePasswordRequestDto;

public interface AuthService {
    ApiResponse changePassword(ChangePasswordRequestDto dto);
}
