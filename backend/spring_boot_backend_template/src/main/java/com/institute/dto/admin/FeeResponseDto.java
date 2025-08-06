package com.institute.dto.admin;


import lombok.*;

import java.time.LocalDate;

import com.institute.entities.enums.FeeStatus;
import com.institute.entities.enums.Status;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeeResponseDto {

    private Long studentId;
    private String studentName;
    private String imagePath;
    private String courseName;
    private LocalDate dueDate;
    private Double totalAmount;
    private Double amountPaid;
    private Double remainingAmount;
    private FeeStatus feeStatus;
}
