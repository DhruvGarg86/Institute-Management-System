package com.institute.service.admin;

import com.institute.dto.ApiResponse;

import com.institute.dto.admin.CountDto;
import com.institute.dto.admin.NoticeDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DashboardService {
    CountDto allStudents();
    CountDto allTeachers();
    CountDto allCourses();
    List<NoticeDto> getLatestNotice();

}
