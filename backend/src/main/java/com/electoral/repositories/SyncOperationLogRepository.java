package com.electoral.repositories;

import com.electoral.entities.SyncOperationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SyncOperationLogRepository extends JpaRepository<SyncOperationLog, Long> {
    Optional<SyncOperationLog> findByOperationId(String operationId);
    boolean existsByOperationId(String operationId);
}
