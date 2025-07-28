package com.institute.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.institute.entities.Fee;
import com.institute.entities.enums.FeeStatus;

@Repository
public interface FeeDao extends JpaRepository<Fee,Long> {
//	student fee dao (student page only)
	Optional<Fee> findFeeByStudentId(@Param("studentId") Long studentId);
//	for all students (admin)
	List<Fee> findByStatus(FeeStatus status);
}
