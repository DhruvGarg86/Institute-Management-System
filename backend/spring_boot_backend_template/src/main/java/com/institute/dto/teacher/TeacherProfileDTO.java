package com.institute.dto.teacher;

import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherProfileDTO {
    private String name;

    private String email;

    private String password;

    private String phoneNumber;

    private String address;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    private LocalDate dob;

    private LocalDate joiningDate;

    private String qualification;

    private String experience;

    private BigDecimal salary;

    private String image;
}
