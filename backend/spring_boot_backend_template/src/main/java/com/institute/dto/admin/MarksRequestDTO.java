package com.institute.dto.admin;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MarksRequestDTO {
        private Long studentId;
        private String subjectName;
        private Double marksObtained;
}
