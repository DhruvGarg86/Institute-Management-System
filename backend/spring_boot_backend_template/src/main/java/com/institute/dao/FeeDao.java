package com.institute.dao;

import com.institute.entities.Fee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeeDao extends JpaRepository<Fee,Long> {
}
