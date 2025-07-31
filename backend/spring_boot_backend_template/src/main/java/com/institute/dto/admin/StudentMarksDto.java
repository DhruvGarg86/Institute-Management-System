package com.institute.dto.admin;

import com.institute.entities.Attendance;
import com.institute.entities.Course;
import com.institute.entities.Fee;
import com.institute.entities.Marks;
import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Status;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

public class StudentMarksDto {

    private Long id;
    private String name;
    private String email;
    private String address;
    private String imagePath;
    private LocalDate dob;
    private String courseName;
    private Set<Marks> marks = new HashSet<Marks>();
}
