package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mesa_usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MesaUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mesa_id", nullable = false)
    private Mesa mesa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
}