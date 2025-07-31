package com.institute.dto.admin;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentPercentageDto {

    private Long studentId;
    private String studentName;
    private String courseName;
    private Double percentage;
}
