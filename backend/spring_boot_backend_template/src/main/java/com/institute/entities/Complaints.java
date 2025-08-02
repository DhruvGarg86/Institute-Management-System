package com.institute.entities;


import com.institute.entities.enums.ComplaintStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@ToString
public class Complaints extends BaseEntity {

    @Column(name="is_deleted")
    private boolean isDeleted = false;

    @Enumerated(EnumType.STRING)
    @Column(name="complaint_status")
    private ComplaintStatus status = ComplaintStatus.ACTIVE;

    @Column(name="description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
}
