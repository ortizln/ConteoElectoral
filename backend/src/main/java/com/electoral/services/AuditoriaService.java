package com.electoral.services;

import com.electoral.entities.Auditoria;
import com.electoral.entities.Usuario;
import com.electoral.repositories.AuditoriaRepository;
import com.electoral.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuditoriaService {
    private final AuditoriaRepository auditoriaRepository;
    private final UsuarioRepository usuarioRepository;

    public void registrarAccion(Long usuarioId, Auditoria.TipoAccion accion, String entidad, 
                                 Long entidadId, Map<String, Object> datosAnteriores, 
                                 Map<String, Object> datosNuevos) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Auditoria auditoria = Auditoria.builder()
                .usuario(usuario)
                .accion(accion)
                .entidad(entidad)
                .entidadId(entidadId)
                .datosAnteriores(datosAnteriores)
                .datosNuevos(datosNuevos)
                .build();

        auditoriaRepository.save(auditoria);
    }

    public Page<Auditoria> getAuditoriaByUsuario(Long usuarioId, Pageable pageable) {
        return auditoriaRepository.findByUsuarioIdOrderByCreatedAtDesc(usuarioId, pageable);
    }

    public List<Auditoria> getAuditoriaReciente() {
        return auditoriaRepository.findTop100ByOrderByCreatedAtDesc();
    }
}