package com.institute.dto.teacher;

import java.time.LocalDate;

import com.institute.entities.enums.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AddNewTeacherDTO {
	private String name;
	
	private String phoneNumber;
	
	private String email;
	
	private String password;
	
	private double salary;

	private LocalDate joiningDate;
	
	private String address;
	
	private Gender gender;
	
	private String image;	
}