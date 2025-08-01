package com.institute.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeeUpdateRequest {
    private LocalDate dueDate;
    private Double totalAmount;
    private Double amountPaid;
    private Double remainingAmount;

}
