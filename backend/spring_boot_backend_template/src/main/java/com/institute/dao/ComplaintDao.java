package com.institute.dao;

import com.institute.entities.Complaints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComplaintDao extends JpaRepository<Complaints, Long> {
    List<Complaints> findByIsDeletedFalse();

    Optional<Complaints> findActiveById(Long id);
}
