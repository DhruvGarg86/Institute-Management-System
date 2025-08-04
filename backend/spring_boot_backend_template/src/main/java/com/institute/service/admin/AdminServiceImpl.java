package com.institute.service.admin;

import com.institute.dao.AdminDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.admin.AdminProfileDTO;
import com.institute.entities.Admin;
import com.institute.entities.Login;
import com.institute.exception.customexceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Transactional
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminDao adminDao;
    private final ModelMapper modelMapper;


    @Override
    public AdminProfileDTO findAdminById(Long id) {
        Admin entity = adminDao.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("No Admin exists by id: " + id));

        AdminProfileDTO dto = modelMapper.map(entity, AdminProfileDTO.class);
        dto.setEmail(entity.getUser().getEmail());

        return dto;
    }

    @Override
    public ApiResponse EditAdminProfile(AdminProfileDTO admin, Long id) {
        Admin entity = adminDao.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("No Admin exists by id: " + id));

        Login login = entity.getUser();
        login.setEmail(admin.getEmail());

        entity.setImage(admin.getImage());
        entity.setName(admin.getName());
        entity.setAddress(admin.getAddress());
        entity.setPhoneNumber(admin.getPhoneNumber());
        entity.setGender(admin.getGender());

        adminDao.save(entity);

        return new ApiResponse("Admin profile updated successfully");
    }
}
