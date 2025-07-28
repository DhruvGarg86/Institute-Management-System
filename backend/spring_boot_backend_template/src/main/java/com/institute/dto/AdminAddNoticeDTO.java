package com.institute.dto;

import java.time.LocalDate;

import com.institute.entities.enums.Audience;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminAddNoticeDTO {
	private Long adminId;
	private Audience audience;
	private String title;
	private LocalDate date;
	private String description;
	private String filePath;
}
