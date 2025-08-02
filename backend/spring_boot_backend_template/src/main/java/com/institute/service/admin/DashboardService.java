package com.institute.service.admin;

import java.util.List;

import com.institute.dto.admin.CountDto;
import com.institute.dto.admin.NoticeDto;

public interface DashboardService{
    CountDto allStudents();
    CountDto allTeachers();
    CountDto allCourses();
    List<NoticeDto> getLatestNotice();

}
