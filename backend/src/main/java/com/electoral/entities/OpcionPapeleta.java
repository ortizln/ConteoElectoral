package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "opcion_papeleta")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OpcionPapeleta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "papeleta_id", nullable = false)
    private Papeleta papeleta;

    @Column(name = "tipo_opcion", nullable = false, length = 20)
    private String tipoOpcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidato_id")
    private Candidato candidato;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lista_id")
    private ListaElectoral lista;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partido_id")
    private Partido partido;

    @Column(name = "partido_sigla", length = 20)
    private String partidoSigla;

    @Column(length = 200)
    private String etiqueta;

    @Column(nullable = false)
    @Builder.Default
    private Integer orden = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
