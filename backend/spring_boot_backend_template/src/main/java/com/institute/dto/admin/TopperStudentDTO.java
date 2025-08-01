package com.institute.dto.admin;

import com.institute.entities.enums.Gender;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TopperStudentDTO {
    private String courseName;
    private String name;
    private String email;
    private String imagePath;
    private Gender gender;
}
