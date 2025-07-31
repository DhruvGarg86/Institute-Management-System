package com.institute.dto.admin;

import com.institute.entities.enums.Grade;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MarksDetailsDto {
    private String subjectName;
    private Double totalMarks;
    private Double marksObtained;
    private Double percentage;
    private Grade grade;
}
