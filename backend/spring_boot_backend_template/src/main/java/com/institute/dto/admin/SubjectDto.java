package com.institute.dto.admin;

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
    private Status status;
}
