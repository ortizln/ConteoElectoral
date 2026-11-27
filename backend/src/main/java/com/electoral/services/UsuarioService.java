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

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import java.util.HashMap;
import java.util.Map;
import com.electoral.util.AuditMap;
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
    private final MesaService mesaService;

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
                .identificacion(normalizarIdentificacion(request.getIdentificacion()))
                .celular(normalizarCelular(request.getCelular()))
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
            AuditMap.of("username", saved.getUsername(), "nombre", saved.getNombre(), "apellido", saved.getApellido(),
                    "email", saved.getEmail(), "identificacion", saved.getIdentificacion(), "celular", saved.getCelular())
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
        Map<String, Object> datosAnteriores = AuditMap.of("nombre", usuario.getNombre(), "apellido", usuario.getApellido(),
                "email", usuario.getEmail(), "identificacion", usuario.getIdentificacion(), "celular", usuario.getCelular());
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setEmail(request.getEmail());
        usuario.setIdentificacion(normalizarIdentificacion(request.getIdentificacion()));
        usuario.setCelular(normalizarCelular(request.getCelular()));
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
            AuditMap.of("nombre", saved.getNombre(), "apellido", saved.getApellido(), "email", saved.getEmail(),
                    "identificacion", saved.getIdentificacion(), "celular", saved.getCelular())
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

    public boolean verifyPassword(Long userId, String rawPassword) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con ID: " + userId));
        return passwordEncoder.matches(rawPassword, usuario.getPassword());
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

    /** Normaliza la cédula: sin espacios y en mayúsculas. Devuelve null si viene vacía. */
    public static String normalizarIdentificacion(String identificacion) {
        if (identificacion == null || identificacion.trim().isEmpty()) {
            return null;
        }
        return identificacion.trim().toUpperCase();
    }

    /** Normaliza el celular a solo dígitos. Devuelve null si viene vacío. */
    public static String normalizarCelular(String celular) {
        if (celular == null || celular.trim().isEmpty()) {
            return null;
        }
        String digitos = celular.replaceAll("\\D", "");
        return digitos.isEmpty() ? null : digitos;
    }

    private UsuarioResponse mapToResponse(Usuario usuario) {
        return UsuarioResponse.builder()
                .id(usuario.getId())
                .username(usuario.getUsername())
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .email(usuario.getEmail())
                .identificacion(usuario.getIdentificacion())
                .celular(usuario.getCelular())
                .rol(usuario.getRol().getNombre())
                .activo(usuario.getActivo())
                .build();
    }

    /**
     * Devuelve usuarios con rol MIEMBRO_MESA y sus mesas asignadas (con datos de recinto
     * denormalizados: institución, parroquia, cantón, provincia) para reporte Excel.
     */
    public List<UsuarioMesaAsignadaDTO> getUsuariosConMesasAsignadas(Long eleccionId) {
        List<UsuarioMesaAsignadaDTO> resultado = new ArrayList<>();
        List<UsuarioResponse> usuarios = getUsuariosByRol("MIEMBRO_MESA");
        for (UsuarioResponse u : usuarios) {
            List<MesaResponse> mesas = mesaService.getMesasByUsuario(u.getId(), eleccionId);
            for (MesaResponse m : mesas) {
                resultado.add(UsuarioMesaAsignadaDTO.builder()
                        .usuarioId(u.getId())
                        .username(u.getUsername())
                        .nombre(u.getNombre())
                        .apellido(u.getApellido())
                        .email(u.getEmail())
                        .rol(u.getRol())
                        .activo(u.getActivo())
                        .mesaId(m.getId())
                        .numeroMesa(m.getNumero())
                        .sexo(m.getSexo())
                        .institucionNombre(m.getInstitucionNombre())
                        .parroquiaNombre(m.getParroquiaNombre())
                        .cantonNombre(m.getCantonNombre())
                        .provinciaNombre(m.getProvinciaNombre())
                        .cerrada(m.getCerrada())
                        .build());
            }
        }
        return resultado;
    }

    /** Conteo de mesas asignadas por usuario MIEMBRO_MESA, para la tabla de usuarios. */
    public Map<Long, Long> getConteoMesasUsuarios(Long eleccionId) {
        Map<Long, Long> conteos = new HashMap<>();
        for (UsuarioResponse u : getUsuariosByRol("MIEMBRO_MESA")) {
            conteos.put(u.getId(), (long) mesaService.getMesasByUsuario(u.getId(), eleccionId).size());
        }
        return conteos;
    }
}