package com.institute.service.admin;

import java.util.List;

import com.institute.dto.AdminAddNoticeDTO;
import com.institute.dto.AdminNoticeDTO;
import com.institute.dto.ApiResponse;

public interface NoticeService {

	List<AdminNoticeDTO> getAllNotices();

	ApiResponse deleteNotice(Long id);

	ApiResponse addNotice(AdminAddNoticeDTO dto);

}
