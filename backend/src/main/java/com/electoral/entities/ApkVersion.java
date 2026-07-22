package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "apk_versions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApkVersion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String version;

    @Column(name = "nombre_archivo")
    private String nombreArchivo;

    @Column(name = "data", columnDefinition = "bytea")
    private byte[] data;

    @Column(name = "fecha_subida")
    private LocalDateTime fechaSubida;

    @PrePersist
    protected void onCreate() {
        fechaSubida = LocalDateTime.now();
    }
}
