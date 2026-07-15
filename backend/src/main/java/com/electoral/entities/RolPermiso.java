package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rol_permisos", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"rol_id", "modulo"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RolPermiso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rol_id", nullable = false)
    private Rol rol;

    @Column(nullable = false, length = 50)
    private String modulo;

    @Column(nullable = false)
    @Builder.Default
    private boolean puedeVer = true;

    @Column(nullable = false)
    @Builder.Default
    private boolean puedeCrear = false;

    @Column(nullable = false)
    @Builder.Default
    private boolean puedeEditar = false;

    @Column(nullable = false)
    @Builder.Default
    private boolean puedeEliminar = false;
}
