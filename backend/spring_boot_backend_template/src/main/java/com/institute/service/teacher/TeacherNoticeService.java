package com.institute.service.teacher;

import com.institute.dto.teacher.TeacherNoticeDTO;

import java.util.List;

public interface TeacherNoticeService {
    List<TeacherNoticeDTO> getNoticesForTeacher();
    List<TeacherNoticeDTO> getLatestFiveTeacherNotices();
}

//FORCING THE PUSH
