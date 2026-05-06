package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "cantones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Canton {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provincia_id", nullable = false)
    private Provincia provincia;

    @Column(length = 500)
    private String descripcion;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "canton", cascade = CascadeType.ALL)
    private List<Parroquia> parroquias;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
