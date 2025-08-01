package com.institute.dto.teacher;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherOwnAttendanceDTO {

//    private Integer teacherId;
    private Integer presentDays;
//    private Integer absentDays;
    private Integer totalWorkingDays;

}
