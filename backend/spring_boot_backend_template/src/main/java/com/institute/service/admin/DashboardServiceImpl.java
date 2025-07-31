package com.institute.service.admin;

import com.institute.dao.CourseDao;
import com.institute.dao.NoticeDao;
import com.institute.dao.StudentDao;
import com.institute.dao.TeacherDao;
import com.institute.dto.admin.CountDto;
import com.institute.dto.admin.NoticeDto;
import com.institute.entities.Notice;
import com.institute.entities.enums.Status;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class DashboardServiceImpl implements DashboardService{
    private final StudentDao studentDao;
    private final CourseDao courseDao;
    private final TeacherDao teacherDao;
    private final NoticeDao noticeDao;
    private final ModelMapper modelMapper;
    @Override
    public CountDto allStudents()
    {
        long count = studentDao.countByStatus(Status.ACTIVE);
        return new CountDto(count);
    }

    @Override
    public CountDto allTeachers() {
        long count = teacherDao.countByStatus(Status.ACTIVE);
        return new CountDto(count);
    }

    @Override
    public CountDto allCourses() {
        long count = courseDao.countByStatus(Status.ACTIVE);
        return new CountDto(count);
    }
    @Override
    public List<NoticeDto> getLatestNotice() {
        List<Notice> notices = noticeDao
                .getTopNotices(PageRequest.of(0, 5));

        return notices.stream()
                .map(notice -> modelMapper.map(notice, NoticeDto.class))
                .collect(Collectors.toList());
    }

}
