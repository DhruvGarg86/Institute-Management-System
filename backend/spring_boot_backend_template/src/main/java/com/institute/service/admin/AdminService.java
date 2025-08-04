package com.institute.service.admin;

import com.institute.dto.ApiResponse;
import com.institute.dto.admin.AdminProfileDTO;

public interface AdminService {

    AdminProfileDTO findAdminById(Long id);

    ApiResponse EditAdminProfile(AdminProfileDTO admin, Long id);
}
