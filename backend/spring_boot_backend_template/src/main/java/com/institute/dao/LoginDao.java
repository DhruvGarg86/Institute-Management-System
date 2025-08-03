package com.institute.dao;

import com.institute.entities.Login;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginDao extends JpaRepository<Login,Long> {
    Optional<Login> findByEmail(String email);
    boolean existsByEmail(String email);
}