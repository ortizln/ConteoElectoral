package com.electoral.repositories;

import com.electoral.entities.MesaUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MesaUsuarioRepository extends JpaRepository<MesaUsuario, Long> {
    List<MesaUsuario> findByUsuarioId(Long usuarioId);
    List<MesaUsuario> findByMesaId(Long mesaId);
    
    @Query("SELECT mu FROM MesaUsuario mu WHERE mu.usuario.id = :usuarioId AND mu.mesa.elecciones.id = :eleccionId")
    List<MesaUsuario> findByUsuarioIdAndEleccionId(Long usuarioId, Long eleccionId);
    
    Optional<MesaUsuario> findByMesaIdAndUsuarioId(Long mesaId, Long usuarioId);
}