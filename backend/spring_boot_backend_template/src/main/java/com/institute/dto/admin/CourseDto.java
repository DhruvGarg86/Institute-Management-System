package com.institute.dto.admin;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class CourseDto {

    @NotBlank(message = "Course name is required")
    @Size(max = 60, message = "Course name must not exceed 30 characters")
    private String name;

    @NotBlank(message = "Description is required")
    @Size(max = 255, message = "Description must not exceed 200 characters")
    private String description;

    @NotBlank(message = "Duration is required")
    private String duration;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    @FutureOrPresent(message = "End date must be today or in the future")
    private LocalDate endDate;

    @NotNull(message = "Fees is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Fees must be positive")
    @Digits(integer = 10, fraction = 2, message = "Fees format is invalid")
    private BigDecimal courseFees;

    @NotNull(message = "Max students is required")
    @Min(value = 1, message = "There must be at least 1 student")
    @Max(value = 300, message = "Max students must not exceed 300")
    private Integer maxStudents;

    @NotEmpty(message = "At least one subject-teacher mapping must be provided")
    private List<@Valid CourseSubjectTeacherDTO> courseSubjectTeachers;

    private String status;
}
