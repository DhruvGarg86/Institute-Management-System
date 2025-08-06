package com.institute.dto.admin;


import java.time.LocalDate;

import com.institute.entities.enums.FeeStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
