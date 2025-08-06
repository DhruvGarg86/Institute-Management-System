package com.institute.service.teacher;

import com.institute.dao.TeacherDao;
import com.institute.dto.teacher.TeacherNoticeDTO;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@Getter
@Setter
@AllArgsConstructor
public class TeacherNoticeServiceImpl implements TeacherNoticeService{

    private final TeacherDao teacherDao;

    @Override
    public List<TeacherNoticeDTO> getNoticesForTeacher() {
        return teacherDao.findAllNoticesForTeacher();
    }

    @Override
    public List<TeacherNoticeDTO> getLatestFiveTeacherNotices() {
        Pageable limit = PageRequest.of(0, 5); // Page 0, size 5
        return teacherDao.findTop2NoticesForTeacher(limit);
    }

//    FORCING THE PUSH
}
