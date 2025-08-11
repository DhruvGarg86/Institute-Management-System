package com.institute.dto.admin;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseSubjectTeacherDTO {

    private String name;

    @NotNull(message = "Subject ID is required")
    private Long subjectId;

    private String teacherName;

    @NotNull(message = "Teacher ID is required")
    private Long teacherId;
}
