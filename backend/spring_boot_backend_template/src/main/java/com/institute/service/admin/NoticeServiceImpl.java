package com.institute.service.admin;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.institute.dao.AdminDao;
import com.institute.dao.NoticeDao;
import com.institute.dto.AdminAddNoticeDTO;
import com.institute.dto.AdminNoticeDTO;
import com.institute.dto.ApiResponse;
import com.institute.entities.Admin;
import com.institute.entities.Notice;
import com.institute.entities.enums.Status;
import com.institute.exception.customexceptions.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class NoticeServiceImpl implements NoticeService {
	private final ModelMapper modelMapper;
	private final NoticeDao noticeDao;
	private final AdminDao adminDao;

	@Override
	public List<AdminNoticeDTO> getAllNotices() {
		return noticeDao.findByStatusOrderByCreatedAtDesc(Status.ACTIVE)
				.stream()
				.map(notice -> modelMapper.map(notice, AdminNoticeDTO.class))
				.toList();
	}

	@Override
	public ApiResponse deleteNotice(Long id) {
		Notice noticeEntity = noticeDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Notice with ID " + id + " doesn't exist"));
		noticeEntity.setStatus(Status.INACTIVE);
		noticeDao.save(noticeEntity);
		return new ApiResponse("Notice id: " + id + " deleted successfully" );
	}

	@Override
	public ApiResponse addNotice(AdminAddNoticeDTO dto) {
		Notice entity = modelMapper.map(dto, Notice.class);
		Admin admin = adminDao.findById(dto.getAdminId())
				.orElseThrow(() -> new ResourceNotFoundException("Admin with id: " + dto.getAdminId() + " not found"));
		entity.setCreatedBy(admin);
		noticeDao.save(entity);
		return new ApiResponse("New notice added");
	}

}
