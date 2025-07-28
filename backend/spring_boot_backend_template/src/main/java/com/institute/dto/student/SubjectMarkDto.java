package com.institute.dto.student;

import com.institute.entities.enums.Grade;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubjectMarkDto {
    private Long subjectId;
    private String subjectName;
    private Double marksObtained;
    private Double totalMarks;
    private Grade grade;
}
