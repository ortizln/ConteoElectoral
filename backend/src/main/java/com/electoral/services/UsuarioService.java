package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import java.util.HashMap;
import java.util.Map;
import com.electoral.util.SecurityUtil;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuditoriaService auditoriaService;
    private final SecurityUtil securityUtil;

    public List<UsuarioResponse> getAllUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public UsuarioResponse getUsuarioById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con ID: " + id));
        return mapToResponse(usuario);
    }

    @Transactional
    public UsuarioResponse createUsuario(UsuarioRequest request) {
        if (usuarioRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateEntityException("El username '" + request.getUsername() + "' ya existe");
        }
        if (request.getEmail() != null && usuarioRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEntityException("El email '" + request.getEmail() + "' ya existe");
        }

        Rol rol = rolRepository.findById(request.getRolId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Rol no encontrado con ID: " + request.getRolId()));

        Usuario usuario = Usuario.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getEmail())
                .rol(rol)
                .activo(request.getActivo())
                .build();

        log.info("Creando {}: {}", "Usuario", usuario.getUsername());
        Usuario saved = usuarioRepository.save(usuario);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.CREATE,
            "Usuario",
            saved.getId(),
            null,
            Map.of("username", saved.getUsername(), "nombre", saved.getNombre(), "apellido", saved.getApellido(), "email", saved.getEmail())
        );
        return mapToResponse(saved);
    }

    @Transactional
    public UsuarioResponse updateUsuario(Long id, UsuarioUpdateRequest request) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con ID: " + id));

        if (request.getEmail() != null && !request.getEmail().equals(usuario.getEmail()) &&
                usuarioRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEntityException("El email '" + request.getEmail() + "' ya existe");
        }
        log.info("Actualizando {} con ID: {}", "Usuario", id);
        Map<String, Object> datosAnteriores = Map.of("nombre", usuario.getNombre(), "apellido", usuario.getApellido(), "email", usuario.getEmail());
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setEmail(request.getEmail());
        usuario.setActivo(request.getActivo());

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if (request.getRolId() != null) {
            Rol rol = rolRepository.findById(request.getRolId())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Rol no encontrado con ID: " + request.getRolId()));
            usuario.setRol(rol);
        }

        Usuario saved = usuarioRepository.save(usuario);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.UPDATE,
            "Usuario",
            id,
            datosAnteriores,
            Map.of("nombre", saved.getNombre(), "apellido", saved.getApellido(), "email", saved.getEmail())
        );
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Usuario no encontrado con ID: " + id);
        }
        log.warn("Eliminando {} con ID: {}", "Usuario", id);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.DELETE,
            "Usuario",
            id,
            null,
            null
        );
        usuarioRepository.deleteById(id);
    }

    @Transactional
    public void resetPassword(Long id, String nuevaPassword) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con ID: " + id));
        usuario.setPassword(passwordEncoder.encode(nuevaPassword));
        usuarioRepository.save(usuario);
    }

    public List<UsuarioResponse> getUsuariosByRol(String rolNombre) {
        return usuarioRepository.findByRolNombre(rolNombre).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private UsuarioResponse mapToResponse(Usuario usuario) {
        return UsuarioResponse.builder()
                .id(usuario.getId())
                .username(usuario.getUsername())
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .email(usuario.getEmail())
                .rol(usuario.getRol().getNombre())
                .activo(usuario.getActivo())
                .build();
    }
}