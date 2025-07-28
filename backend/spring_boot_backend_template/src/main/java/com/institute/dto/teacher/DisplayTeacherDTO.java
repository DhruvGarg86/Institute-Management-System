package com.institute.dto.teacher;

import java.time.LocalDate;
import java.util.List;

import com.institute.dto.DisplayTeacherSubjectDTO;
import com.institute.entities.enums.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DisplayTeacherDTO {
	private Long id;
		
	private String name;
	
	private String phoneNumber;
	
	private String address;
	
	private String email;
	
	private LocalDate joiningDate;
	
	private Status status;
	
	private String image;
	
	private List<DisplayTeacherSubjectDTO> subjects;
}