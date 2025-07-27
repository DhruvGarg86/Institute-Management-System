package com.institute.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class SubjectDto {
	private String name;
	private String code;
	private String description;
	private boolean status;
}
