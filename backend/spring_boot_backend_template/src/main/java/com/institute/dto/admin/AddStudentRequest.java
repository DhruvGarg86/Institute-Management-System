package com.institute.dto.admin;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class AddStudentRequest {

    @Schema(description = "Student details as JSON string")
    private AddStudentDto student;

    @Schema(type = "string", format = "binary", description = "Profile image file")
    private MultipartFile image;
}
