package com.institute.dto.complaint;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DisplayComplaintDto {
    private Long id;
    private String description;
    private String studentName;
    private LocalDate date;
}
