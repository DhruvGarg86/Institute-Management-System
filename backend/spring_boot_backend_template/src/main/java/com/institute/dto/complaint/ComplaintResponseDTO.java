package com.institute.dto.complaint;

import com.institute.entities.Login;
import com.institute.entities.enums.ComplaintStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ComplaintResponseDTO {
    private Long id;
    private String description;
    private ComplaintStatus status;
    private boolean isDeleted;
    private Long studentId;
    private LocalDate date;
    private String studentName;
}
