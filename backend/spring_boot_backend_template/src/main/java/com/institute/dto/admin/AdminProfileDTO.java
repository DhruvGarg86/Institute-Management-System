package com.institute.dto.admin;

import com.institute.entities.enums.Gender;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminProfileDTO {
    private String image;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private Gender gender;
}
