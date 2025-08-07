package com.institute.dto.admin;

import com.institute.entities.enums.ComplaintStatus;
import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ComplaintsDto {

    private String studentName;
    private String courseName;
    private LocalDate dateOfComplaint;
    private ComplaintStatus status;
    private String description;
}
