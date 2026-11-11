package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "instituciones_educativas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstitucionEducativa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String nombre;

    @Column(length = 500)
    private String direccion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parroquia_id", nullable = false)
    private Parroquia parroquia;

    @Column(length = 20)
    private String codigo;

    @Column(length = 50)
    private String tipo;

    // Recinto: geolocalización (null si no se ha registrado)
    private Double latitud;

    private Double longitud;

    // Recinto: número de personas registradas para votar (padrón)
    @Column(name = "electores_registrados")
    private Integer electoresRegistrados;

    // ===== Juntas (mesas) de la institución =====
    // Cantidad de juntas femeninas / masculinas
    private Integer junfem;
    private Integer junmas;
    // Rango de números de mesa femeninas (desde / hasta)
    @Column(name = "juninif")
    private Integer juninif;
    @Column(name = "junfinf")
    private Integer junfinf;
    // Rango de números de mesa masculinas (desde / hasta)
    @Column(name = "juninim")
    private Integer juninim;
    @Column(name = "junfinm")
    private Integer junfinm;
    // Total de juntas = junfem + junmas (calculado en backend al guardar)
    private Integer numjun;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
