package com.institute.dao;

import com.institute.entities.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceDao extends JpaRepository<Attendance,Long> {
}
