package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "provincias")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Provincia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zona_id", nullable = false)
    private Zona zona;

    @Column(length = 500)
    private String descripcion;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "provincia", cascade = CascadeType.ALL)
    private List<Canton> cantones;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
