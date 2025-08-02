package com.institute.entities;

import java.time.LocalDate;

import com.institute.entities.enums.FeeStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "fee")
@Getter
@Setter
@ToString
public class Fee extends BaseEntity {

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Column(name = "amount_paid", nullable = false)
    private Double amountPaid;

    @Column(name = "remaining_amount", nullable = false)
    private Double remainingAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 10, nullable = false)
    private FeeStatus status = FeeStatus.UNPAID;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private Student student;
    
    @FutureOrPresent(message = "Due date cannot be in the past")
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

}
