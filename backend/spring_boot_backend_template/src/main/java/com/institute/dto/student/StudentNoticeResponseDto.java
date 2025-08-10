package com.institute.dto.student;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentNoticeResponseDto {

    private LocalDate date;
    private String title;
    private String description;
    private String filePath;
}
