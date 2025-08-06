package com.institute.dto.teacher;

import jakarta.validation.constraints.*;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseSubjectTeacherDTO {

    @NotNull
    private Long id;

    @NotNull
    private Long subjectId;

    @NotBlank
    private String subjectName;

    @NotNull
    private Long teacherId;

    @NotBlank
    private String teacherName;
}
