package com.institute.dao;

import com.institute.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminDao extends JpaRepository<Admin,Long> {

    Optional<Admin> findByUserId(Long id);
}
