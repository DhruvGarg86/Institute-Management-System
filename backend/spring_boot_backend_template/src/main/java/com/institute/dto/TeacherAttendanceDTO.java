package com.institute.dto;

import java.time.LocalDate;

import com.institute.entities.enums.Status;

public class TeacherAttendanceDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private LocalDate joiningDate;
    private Status status;
    private Integer presentDays;
    private Integer absentDays;
    private Integer totalWorkingDays;
    private Double attendancePercentage;

    // ✅ THIS CONSTRUCTOR MUST MATCH YOUR QUERY EXACTLY
    public TeacherAttendanceDTO(String firstName, String lastName, String email, String phoneNumber, String address,
                                LocalDate joiningDates, Integer presentDays,
                                Integer absentDays, Integer totalWorkingDays, Double attendancePercentage) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.joiningDate = joiningDate;
        this.status = Status.ACTIVE;
        this.presentDays = presentDays;
        this.absentDays = absentDays;
        this.totalWorkingDays = totalWorkingDays;
        this.attendancePercentage = attendancePercentage;
    }

    // ✅ getters and setters
}
