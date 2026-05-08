package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class MesaService {
    private final MesaRepository mesaRepository;
    private final InstitucionEducativaRepository institucionRepository;
    private final EleccionService eleccionService;
    private final MesaUsuarioRepository mesaUsuarioRepository;

    @Transactional(readOnly = true)
    public List<MesaResponse> getMesasByEleccion(Long eleccionesId) {
        return mesaRepository.findByEleccionesId(eleccionesId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MesaResponse> getMesasByInstitucion(Long institucionId) {
        return mesaRepository.findByInstitucionId(institucionId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MesaResponse getMesaById(Long id) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
        return mapToResponse(mesa);
    }

    public Mesa getMesaEntityById(Long id) {
        return mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
    }

    @Transactional
    public MesaResponse createMesa(MesaRequest request) {
        if (mesaRepository.existsByNumeroAndInstitucionId(request.getNumero(), request.getInstitucionId())) {
            throw new DuplicateEntityException("Ya existe una mesa con el número '" + request.getNumero() + "' en esta institución");
        }
        InstitucionEducativa institucion = institucionRepository.findById(request.getInstitucionId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Institución no encontrada con ID: " + request.getInstitucionId()));
        Eleccion eleccion = eleccionService.getEleccionEntityById(request.getEleccionesId());

        Mesa mesa = Mesa.builder()
                .numero(request.getNumero())
                .sexo(Mesa.SexoMesa.valueOf(request.getSexo()))
                .institucion(institucion)
                .elecciones(eleccion)
                .cerrada(false)
                .build();

        return mapToResponse(mesaRepository.save(mesa));
    }

    @Transactional
    public MesaResponse updateMesa(Long id, MesaRequest request) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));

        if (request.getNumero() != null && !mesa.getNumero().equals(request.getNumero()) &&
                mesaRepository.existsByNumeroAndInstitucionIdAndIdNot(request.getNumero(), mesa.getInstitucion().getId(), id)) {
            throw new DuplicateEntityException("Ya existe una mesa con el número '" + request.getNumero() + "' en esta institución");
        }
        if (request.getNumero() != null) mesa.setNumero(request.getNumero());
        if (request.getSexo() != null) mesa.setSexo(Mesa.SexoMesa.valueOf(request.getSexo()));

        return mapToResponse(mesaRepository.save(mesa));
    }

    @Transactional
    public void deleteMesa(Long id) {
        if (!mesaRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id);
        }
        mesaRepository.deleteById(id);
    }

    @Transactional
    public MesaResponse cerrarMesa(Long id) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
        
        if (mesa.getCerrada()) {
            throw new IllegalStateException("La mesa ya está cerrada");
        }
        
        mesa.setCerrada(true);
        return mapToResponse(mesaRepository.save(mesa));
    }

    @Transactional
    public void asignarUsuario(Long mesaId, Long usuarioId) {
        if (mesaUsuarioRepository.findByMesaIdAndUsuarioId(mesaId, usuarioId).isPresent()) {
            throw new IllegalStateException("Esta mesa ya esta asignada a este usuario");
        }
        
        Mesa mesa = getMesaEntityById(mesaId);
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con ID: " + usuarioId));
        
        MesaUsuario mesaUsuario = MesaUsuario.builder()
                .mesa(mesa)
                .usuario(usuario)
                .build();
        
        mesaUsuarioRepository.save(mesaUsuario);
    }

    @Transactional
    public void desasignarUsuario(Long mesaId, Long usuarioId) {
        mesaUsuarioRepository.findByMesaIdAndUsuarioId(mesaId, usuarioId)
                .ifPresent(mesaUsuario -> mesaUsuarioRepository.delete(mesaUsuario));
    }

    public boolean usuarioPerteneceAMesa(Long usuarioId, Long mesaId) {
        return mesaUsuarioRepository.findByMesaIdAndUsuarioId(mesaId, usuarioId).isPresent();
    }

    public List<Mesa> getMesasAsignadas(Long usuarioId, Long eleccionId) {
        return mesaUsuarioRepository.findByUsuarioIdAndEleccionId(usuarioId, eleccionId)
                .stream()
                .map(MesaUsuario::getMesa)
                .collect(Collectors.toList());
    }

    private MesaResponse mapToResponse(Mesa mesa) {
        List<MesaUsuario> mesaUsuarios = mesaUsuarioRepository.findByMesaId(mesa.getId());
        String usuarioNombre = mesaUsuarios.isEmpty() ? null : 
            mesaUsuarios.get(0).getUsuario().getNombre() + " " + mesaUsuarios.get(0).getUsuario().getApellido();
        Long usuarioId = mesaUsuarios.isEmpty() ? null : mesaUsuarios.get(0).getUsuario().getId();

        return MesaResponse.builder()
                .id(mesa.getId())
                .numero(mesa.getNumero())
                .sexo(mesa.getSexo().name())
                .institucionId(mesa.getInstitucion().getId())
                .institucionNombre(mesa.getInstitucion().getNombre())
                .eleccionesId(mesa.getElecciones().getId())
                .cerrada(mesa.getCerrada())
                .usuarioId(usuarioId)
                .usuarioNombre(usuarioNombre)
                .build();
    }

    private final UsuarioRepository usuarioRepository;
}