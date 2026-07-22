package com.electoral.repositories;

import com.electoral.entities.ApkVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApkVersionRepository extends JpaRepository<ApkVersion, Long> {
    List<ApkVersion> findAllByOrderByFechaSubidaDesc();
    Optional<ApkVersion> findTopByOrderByFechaSubidaDesc();
}
