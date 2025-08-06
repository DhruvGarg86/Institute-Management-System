package com.institute.dto.teacher;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherNoticeDTO {
    private LocalDate date;
    private String description;
    private String title;
}
