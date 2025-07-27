package com.institute.dto;

import java.util.HashSet;
import java.util.Set;

import com.institute.entities.enums.Status;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SubjectDto {
	@NotBlank
    private String name;
	@NotBlank
	@Pattern(regexp = "\\d{1,4}", message = "Code must be numeric")
    private String code;
	@NotBlank
    private String description;
    private Long teacherId;                     // ✅ Optional
    private Set<Long> courseIds = new HashSet<>(); // ✅ New field
    private Status status;
}
