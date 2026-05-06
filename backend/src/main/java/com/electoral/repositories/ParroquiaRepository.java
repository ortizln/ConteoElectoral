package com.electoral.repositories;

import com.electoral.entities.Parroquia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ParroquiaRepository extends JpaRepository<Parroquia, Long> {
    List<Parroquia> findByCantonId(Long cantonId);
}
