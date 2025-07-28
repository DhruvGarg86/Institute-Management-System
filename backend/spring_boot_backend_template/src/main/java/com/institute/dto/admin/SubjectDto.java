package com.institute.dto.admin;

import com.institute.entities.enums.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubjectDTO {
    private Long id;
    private String code;
    private String name;
    private String description;
    private Status status;
}
