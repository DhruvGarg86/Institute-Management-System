package com.institute.dao;

import com.institute.entities.Marks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectDao extends JpaRepository<Marks,Long> {
}
