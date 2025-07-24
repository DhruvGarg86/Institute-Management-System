package com.institute.entities;

import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Status;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "admin")
@Getter
@Setter
@ToString(exclude = "password")
public class Admin extends BaseEntity {

	@Column(name = "first_name", length = 15, nullable = false )
	private String firstName;
	
	@Column(name = "last_name", length = 15)
	private String lastName;

	@Column(name = "phone_number", length = 15)
	private String phoneNumber;		
	
	@Column(name = "email", length = 100, nullable = false, unique = true)
	private String email;
	
	@Column(name = "password", length = 255, nullable = false)
	private String password;
	
	@Column(name = "address", length = 255)
	private String address;
	
	@Enumerated(EnumType.STRING) 
	@Column(name = "gender", length = 15, nullable = false)
	private Gender gender;
	
	@Enumerated(EnumType.STRING) 
	@Column(name = "status", length = 15, nullable = false)
	private Status status = Status.ACTIVE;
}
