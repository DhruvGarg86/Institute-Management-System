package com.institute.dto.student;


import com.institute.entities.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileDto {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private String imagePath;
    private String courseName;
    private LocalDate admissionDate;
    private LocalDate dob;
    private Gender gender;
}
