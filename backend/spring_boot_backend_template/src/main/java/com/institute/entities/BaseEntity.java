package com.institute.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
@Setter
@ToString
public class BaseEntity {
	// add common fields
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@CreationTimestamp
	@Column(name="created_at", updatable = false)
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name="updated_at")
	private LocalDateTime updatedAt;

	@Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;
}