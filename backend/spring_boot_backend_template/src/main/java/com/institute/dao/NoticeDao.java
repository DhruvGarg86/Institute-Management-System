package com.institute.dao;

import com.institute.entities.Notice;
import com.institute.entities.enums.Status;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeDao extends JpaRepository<Notice,Long> {

	List<Notice> findByStatus(Status status);
	Optional<Notice> findById(Long id);
}
