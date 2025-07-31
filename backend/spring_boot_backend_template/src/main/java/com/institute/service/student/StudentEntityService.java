package com.institute.service.student;

import com.institute.dto.student.StudentNoticeResponseDto;

import java.util.List;

public interface StudentEntityService {
    List<StudentNoticeResponseDto> getStudentNotices();
}
