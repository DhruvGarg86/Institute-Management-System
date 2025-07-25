package com.institute.dao;

import com.institute.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminDao extends JpaRepository<Admin,Long> {
}
