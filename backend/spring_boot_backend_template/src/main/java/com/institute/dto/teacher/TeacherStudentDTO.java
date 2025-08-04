package com.institute.dto.teacher;

import com.institute.entities.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

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
