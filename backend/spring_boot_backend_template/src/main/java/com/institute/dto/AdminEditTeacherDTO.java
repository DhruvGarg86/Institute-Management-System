package com.institute.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AdminEditTeacherDTO {
	
	private String name;
	
	private String phoneNumber;
	
	private String email;

	private BigDecimal salary;

	private LocalDate joiningDate;
	
	private String address;
	
	private Gender gender;
	
	private Status status;
	
	private String image;
}