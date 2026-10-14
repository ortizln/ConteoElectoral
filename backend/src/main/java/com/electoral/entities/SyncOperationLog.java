package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sync_operations_log", uniqueConstraints = {
    @UniqueConstraint(name = "uk_sync_op_operation_id", columnNames = "operation_id")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SyncOperationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "operation_id", nullable = false, length = 100)
    private String operationId;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(name = "entity_type", nullable = false, length = 50)
    private String entityType;

    @Column(name = "entity_id")
    private Long entityId;

    @Column(name = "action", nullable = false, length = 20)
    private String action;

    @Column(name = "result_success", nullable = false)
    private Boolean resultSuccess;

    @Column(name = "result_error", length = 500)
    private String resultError;

    @Column(name = "server_entity_id")
    private Long serverEntityId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
