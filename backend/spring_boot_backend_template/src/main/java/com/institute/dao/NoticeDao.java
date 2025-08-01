package com.institute.dao;

import com.institute.entities.Notice;
import com.institute.entities.enums.Status;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.institute.dto.admin.NoticeDto;
import com.institute.entities.Marks;
import com.institute.entities.Notice;
import com.institute.entities.enums.Audience;
import com.institute.entities.enums.Status;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.institute.entities.Notice;
import com.institute.entities.enums.Audience;
import com.institute.entities.enums.Status;

public interface NoticeDao extends JpaRepository<Notice, Long> {
	Optional<Notice> findById(Long id);


	@Query("SELECT n FROM Notice n " +
			"WHERE n.status = 'ACTIVE' AND n.isDeleted = false " +
			"ORDER BY n.createdAt DESC")
	List<Notice> getTopNotices(Pageable pageable);

    List<Notice> findByAudienceAndStatusOrderByDateDesc(Audience audience, Status status);

	List<Notice> findByStatus(Status status);
}
