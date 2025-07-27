package com.institute.dto;

import com.institute.entities.enums.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DisplayTeacherSubjectDTO {
    private Long id;
    private String code;
    private String name;
    private String description;
    private Status status;
}