package com.institute.dto.teacher;

import com.institute.entities.enums.Status;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherDisplayCourseDTO {

    @NotNull
    private Long id;

    @NotBlank
    @Size(max = 30)
    private String name;

    @NotBlank
    @Size(max = 200)
    private String description;

    @NotBlank
    @Size(max = 30)
    private String duration;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;

    @Digits(integer = 10, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal courseFees;

    @NotNull
    @Min(1)
    private Integer maxStudents;

    @NotNull
    private Status status;

    // List of course-subject-teacher assignments
    @NotNull
    private List<CourseSubjectTeacherDTO> courseSubjectTeachers;
}
