package com.institute.dto.admin;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TopperStudentResponseDto {
    private String studentName;
    private String imagePath;
    private String courseName;
    private double percentage;
}
