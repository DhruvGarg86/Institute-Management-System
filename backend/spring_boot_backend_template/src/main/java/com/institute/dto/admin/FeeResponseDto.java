package com.institute.dto.admin;


import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeeResponseDto {

    private Long studentId;
    private String studentName;
    private String profilePicture;
    private String courseName;
    private LocalDate dueDate;
    private Double totalAmount;
    private Double amountPaid;
    private Double remainingAmount;
}
