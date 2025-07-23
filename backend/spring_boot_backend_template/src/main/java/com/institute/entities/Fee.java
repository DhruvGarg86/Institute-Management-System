package com.institute.entities;

import com.institute.entities.enums.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "fee")
@Getter
@Setter
@ToString
public class Fee extends BaseEntity {


    @Column(name = "amount_paid", precision = 10, scale = 2, nullable = false)
    private Double amountPaid;

    @Column(name = "remaining_amount", precision = 10, scale = 2, nullable = false)
    private Double remainingAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 10, nullable = false)
    private FeeStatus status = FeeStatus.UNPAID;

}
