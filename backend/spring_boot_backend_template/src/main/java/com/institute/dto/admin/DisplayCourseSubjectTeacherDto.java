package com.institute.dto.admin;

import java.util.Set;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DisplayCourseSubjectTeacherDto {
    private Set<CourseSubjectTeacherResponseDto> mappings;
}
