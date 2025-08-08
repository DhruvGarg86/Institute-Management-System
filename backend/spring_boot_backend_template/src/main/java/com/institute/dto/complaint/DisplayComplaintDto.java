package com.institute.dto.complaint;

import com.institute.entities.enums.ComplaintStatus;
import com.institute.entities.enums.Status;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DisplayComplaintDto {
    private Long id;
    private String description;
    private String studentName;
    private ComplaintStatus status;
    private LocalDate date;
}
