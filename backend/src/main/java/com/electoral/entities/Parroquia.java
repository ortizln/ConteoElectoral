package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "parroquias")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Parroquia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "canton_id", nullable = false)
    private Canton canton;

    @Column(length = 500)
    private String descripcion;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "parroquia", cascade = CascadeType.ALL)
    private List<InstitucionEducativa> instituciones;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
