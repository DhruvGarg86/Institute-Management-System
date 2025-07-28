package com.institute.dto.student;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentMarksDto {
	private String studentName;
    private Long courseId;
    private String courseName;

    private List<SubjectMarkDto> subjectMarks;

    private Double totalMarksObtained;
    private Double totalMarks;
    private Double percentage;
}
