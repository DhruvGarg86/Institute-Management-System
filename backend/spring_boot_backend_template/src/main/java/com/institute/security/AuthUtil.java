package com.institute.security;

import com.institute.exception.customexceptions.ApiException;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthUtil {

    public static Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof CustomUserDetails userDetails) {
            return userDetails.getId();
        }

        throw new ApiException("User is not authenticated");
    }

}
