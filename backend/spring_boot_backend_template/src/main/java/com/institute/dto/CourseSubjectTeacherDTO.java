package com.institute.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseSubjectTeacherDTO {
    private Long id; // Optional: Only needed when updating or responding
    private Long courseId;
    private Long subjectId;
    private Long teacherId;
}
