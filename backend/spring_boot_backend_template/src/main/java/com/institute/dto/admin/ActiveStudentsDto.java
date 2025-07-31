package com.institute.dto.admin;

import com.institute.entities.Attendance;
import com.institute.entities.Course;
import com.institute.entities.Fee;
import com.institute.entities.Marks;
import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ActiveStudentsDto {

    private Long id ;
    private String name;
    private String phoneNumber;
    private String courseName;
    private Double attendancePercentage;

}
