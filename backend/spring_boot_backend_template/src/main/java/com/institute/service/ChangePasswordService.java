package com.institute.service;

import com.institute.dto.EmailDto;
import com.institute.dto.ChangePasswordDto;
import com.institute.dto.ApiResponse;

public interface ChangePasswordService {
    ApiResponse verifyEmail(EmailDto dto);
    ApiResponse changePassword(ChangePasswordDto dto);
}
