package com.institute.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ActiveStudentsDto {

    private Long id ;
    private String image;
    private String name;
    private String phoneNumber;
    private String courseName;
    private Double attendancePercentage;

}
