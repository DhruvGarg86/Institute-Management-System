package com.institute.dto.teacher;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherStudentDTO {
    private Long id;
    private String name;
    private String phoneNumber;
    private LocalDate dob;
    private String address;
    private String courseName;
    private String imagePath;
}
