package com.institute.entities;


import com.institute.entities.enums.ComplaintStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_complaints")
@Getter
@Setter
@ToString
public class Complaints {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Id")
    private Long id;

    @Column(name="isDeleted")
    private boolean isDeleted = false;

    @Enumerated(EnumType.STRING)
    @Column(name="Status")
    private ComplaintStatus status = ComplaintStatus.ACTIVE;

    @Column(name="Description")
    private String description;

    @CreationTimestamp
    @Column(name="Date", updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "StudentId", nullable = false)
    private Student student;
}