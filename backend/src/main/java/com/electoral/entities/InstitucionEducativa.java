package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

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

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "institucion", cascade = CascadeType.ALL)
    private List<Recinto> recintos;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
