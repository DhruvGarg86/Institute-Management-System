package com.institute.dto.admin;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import com.institute.entities.enums.Status;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DisplayCourseSubjectTeacherDto {
    private Long id;
    private String name;
    private String description;
    private String duration;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal courseFees;
    private Integer maxStudents;
    private Status status;

    private Set<CourseSubjectTeacherResponseDto> mappings;
}
