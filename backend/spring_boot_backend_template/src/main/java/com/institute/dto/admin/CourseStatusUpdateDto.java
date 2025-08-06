package com.institute.dto.admin;

import com.institute.entities.enums.Status;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseStatusUpdateDto {
    @NotNull
    private Status status;
}
