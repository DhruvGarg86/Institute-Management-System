package com.institute.entities;

import com.institute.entities.enums.Audience;
import com.institute.entities.enums.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Table(name = "notice")
@Getter
@Setter
@ToString
public class Notice extends BaseEntity {

	@Column(name = "date", nullable = false)
	private LocalDate date;

	@Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "filePath")
    private String filePath;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 10, nullable = false)
    private Status status = Status.ACTIVE;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private Admin createdBy;

    @Enumerated(EnumType.STRING)
    @Column(name = "target_audience", nullable = false, length = 20)
    private Audience audience;

}
