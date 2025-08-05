package com.institute.dto.admin;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubjectDto {

    @Min(value = 1, message = "Code must be a positive integer")
    @Max(value = 9999, message = "Code must not exceed 4 digits")
    private Integer code;

    @NotBlank(message = "Subject name is required")
    @Size(max = 30, message = "Subject name must not exceed 30 characters")
    private String name;

    @NotBlank(message = "Description is required")
    @Size(max = 255, message = "Description must not exceed 255 characters")
    private String description;

}
