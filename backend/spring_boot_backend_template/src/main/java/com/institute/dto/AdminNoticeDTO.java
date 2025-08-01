package com.institute.dto;

import java.time.LocalDate;

import com.institute.entities.enums.Audience;
import com.institute.entities.enums.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminNoticeDTO {
	private Long id;
	private String title;
	private String description;
	private LocalDate date;
	private Audience audience;
	private Status status;
	private String filePath;
}
