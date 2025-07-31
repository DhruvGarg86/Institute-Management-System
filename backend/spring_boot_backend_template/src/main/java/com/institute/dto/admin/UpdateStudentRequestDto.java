package com.institute.dto.admin;

import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStudentRequestDto {
    private String name;
    private String phoneNumber;
    private String email;
    private LocalDate dob;
    private LocalDate admissionDate;
    private String address;
    private Long courseId;
    private Gender gender;
    private Status status;
    private String imagePath;
}