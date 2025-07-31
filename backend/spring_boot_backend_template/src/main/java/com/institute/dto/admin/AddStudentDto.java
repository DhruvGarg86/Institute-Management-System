package com.institute.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddStudentDto {

    private String name;
    private String phoneNumber;
    private String email;
    private String address;
    private String imagePath;
    private String gender;
    private String dob;
    private String courseName;
}
