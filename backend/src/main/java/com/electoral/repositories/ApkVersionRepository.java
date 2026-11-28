package com.electoral.repositories;

import com.electoral.entities.ApkVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApkVersionRepository extends JpaRepository<ApkVersion, Long> {

    /** Proyección sin el bytea de la APK: evita cargar todos los binarios en memoria. */
    interface ApkVersionMetadata {
        Long getId();
        String getVersion();
        String getNombreArchivo();
        LocalDateTime getFechaSubida();
    }

    List<ApkVersionMetadata> findAllByOrderByFechaSubidaDesc();

    Optional<ApkVersionMetadata> findFirstByOrderByFechaSubidaDesc();

    /** Único acceso al binario: se usa solo al descargar una versión concreta. */
    Optional<ApkVersion> findTopByOrderByFechaSubidaDesc();
}
