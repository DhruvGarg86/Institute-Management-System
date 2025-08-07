package com.institute.controllers.student;

import com.institute.dto.student.StudentNoticeResponseDto;
import com.institute.service.student.StudentEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class StudentNoticeController {

    private final StudentEntityService studentEntityService;

    @GetMapping("/notices")
    public List<StudentNoticeResponseDto> getNotices() {
        return studentEntityService.getStudentNotices();
    }
}
