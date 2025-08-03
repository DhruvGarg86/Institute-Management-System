package com.institute.dto.admin;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.institute.entities.Marks;

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
