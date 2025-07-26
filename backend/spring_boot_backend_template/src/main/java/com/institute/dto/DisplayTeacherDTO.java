package com.institute.dto;

import java.time.LocalDate;

import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class DisplayTeacherDTO {
	private String firstName;
	
	private String lastName;
	
	private String phoneNumber;
	
	private String address;
	
	private String email;
	
	private LocalDate joiningDate;
	
	private Status status;
//	private List<Subject> subjects;
}