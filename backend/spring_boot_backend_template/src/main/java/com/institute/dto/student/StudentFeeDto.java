package com.institute.dto.student;

import java.time.LocalDate;

import com.institute.entities.enums.FeeStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentFeeDto {
    private Double totalAmount;
    private Double amountPaid;
    private Double remainingAmount;
    private FeeStatus status = FeeStatus.UNPAID;
    private LocalDate dueDate;

    // Flattened fields from Student
    private Long studentId;
    private String studentName;
    private String email;
    private String courseName;
}
