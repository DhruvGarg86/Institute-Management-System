package com.institute.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentMarksResponseDto {

    private Long studentId;
    private String name;
    private String email;
    private String image;
    private LocalDate dob;
    private String courseName;

    private List<MarksDetailsDto> marksDetails;
}
