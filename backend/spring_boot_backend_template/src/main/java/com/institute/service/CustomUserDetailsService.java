package com.institute.service;

import com.institute.dao.LoginDao;
import com.institute.entities.Login;
import com.institute.exception.customexceptions.ApiException;
import com.institute.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private LoginDao loginDao;

    @Override
    public UserDetails loadUserByUsername(String email) throws ApiException {
        Login login = loginDao.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        return new CustomUserDetails(login);
    }
}
