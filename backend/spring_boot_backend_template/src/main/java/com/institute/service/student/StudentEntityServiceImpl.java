package com.institute.service.student;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.institute.dao.NoticeDao;
import com.institute.dto.student.StudentNoticeResponseDto;
import com.institute.entities.Notice;
import com.institute.entities.enums.Audience;
import com.institute.entities.enums.Status;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class StudentEntityServiceImpl implements StudentEntityService{

    private final NoticeDao noticeDao;

    @Override
    public List<StudentNoticeResponseDto> getStudentNotices() {
        List<Notice> notices = noticeDao.findByAudienceAndStatusOrderByDateDesc(Audience.STUDENT, Status.ACTIVE);
        return notices.stream()
                .map(n -> new StudentNoticeResponseDto(n.getDate(), n.getTitle(), n.getDescription()))
                .collect(Collectors.toList());

    }
}
