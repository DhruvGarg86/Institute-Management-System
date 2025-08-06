package com.institute.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseSubjectTeacherResponseDto {
    private Long subjectId;
    private String subjectName;
    private Long teacherId;
    private String teacherName;
}
