package com.institute.dto.admin;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class SubjectMappingDetailsDTO {
    private Integer code;
    private String name;
    private String description;

    private Set<String> courseNames;
    private Set<String> teacherNames;
}
