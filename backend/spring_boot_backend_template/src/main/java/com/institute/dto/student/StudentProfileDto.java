package com.institute.dto.student;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
