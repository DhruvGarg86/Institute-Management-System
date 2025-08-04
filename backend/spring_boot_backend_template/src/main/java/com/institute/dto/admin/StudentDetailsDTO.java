package com.institute.dto.admin;

import com.institute.entities.enums.Status;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StudentDetailsDTO {
    private Long id;
    private String name;
    private String phoneNumber;
    private LocalDate dob;
    private String address;
    private String courseName;
    private String image;
    private Status status;
}
