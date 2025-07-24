package com.institute.entities;

import com.institute.entities.enums.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "marks")
@Getter
@Setter
@ToString
public class Marks extends BaseEntity {

    @Column(name = "marks_obtained", nullable = false)
    private Double marksObtained;

    @Column(name = "total_marks", nullable = false)
    private Double totalMarks;	

    @Enumerated(EnumType.STRING)
    @Column(name = "grade", length = 2, nullable = false)
    private Grade grade;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 10, nullable = false)
    private Status status = Status.ACTIVE;
}
