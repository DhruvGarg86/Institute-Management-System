package com.institute.dto.teacher;

import java.time.LocalDate;
import java.util.List;

import com.institute.entities.enums.Status;

// import com.institute.dto.teacher.SubjectDTO;
import com.institute.dto.SubjectDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DisplayTeacherDTO {
	private Long id;
		
	private String name;
	
	private String phoneNumber;
	
	private String address;
	
	private String email;
	
	private LocalDate joiningDate;
	
	private Status status;
	
	private String image;
	
	private List<SubjectDTO> subjects;
}