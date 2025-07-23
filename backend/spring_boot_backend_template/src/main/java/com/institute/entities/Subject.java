package com.institute.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;



import com.institute.entities.enums.Status;

@Entity
@Table(name = "subjects")
@Getter
@Setter
@ToString
public class Subject extends BaseEntity {

    @Column(name = "name", length = 50, nullable = false, unique = true)
    private String name;

    @Column(name = "code", length = 20, nullable = false, unique = true)
    private String code; 

    @Column(name = "description", length = 255)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 10, nullable = false)
    private Status status = Status.ACTIVE;
    
}
