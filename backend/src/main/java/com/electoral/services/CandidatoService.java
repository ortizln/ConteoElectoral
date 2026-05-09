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
import lombok.extern.slf4j.Slf4j;
import java.util.HashMap;
import java.util.Map;
import com.electoral.util.SecurityUtil;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class CandidatoService {
    private final CandidatoRepository candidatoRepository;
    private final PartidoRepository partidoRepository;
    private final CargoRepository cargoRepository;
    private final EleccionService eleccionService;
    private final AuditoriaService auditoriaService;
    private final SecurityUtil securityUtil;

    @Transactional(readOnly = true)
    public List<CandidatoResponse> getCandidatosByEleccion(Long eleccionesId) {
        return candidatoRepository.findByEleccionesId(eleccionesId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CandidatoResponse> getCandidatosOrderByCargo(Long eleccionId) {
        return candidatoRepository.findByEleccionOrderByCargo(eleccionId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CandidatoResponse getCandidatoById(Long id) {
        Candidato candidato = candidatoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Candidato no encontrado con ID: " + id));
        return mapToResponse(candidato);
    }

    @Transactional
    public CandidatoResponse createCandidato(CandidatoRequest request) {
        Eleccion eleccion = eleccionService.getEleccionEntityById(request.getEleccionesId());
        Cargo cargo = cargoRepository.findById(request.getCargoId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Cargo no encontrado con ID: " + request.getCargoId()));
        
        Partido partido = null;
        if (request.getPartidoId() != null) {
            partido = partidoRepository.findById(request.getPartidoId())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Partido no encontrado con ID: " + request.getPartidoId()));
            
            boolean existeCandidato = candidatoRepository.existsByEleccionesIdAndPartidoIdAndCargoId(
                request.getEleccionesId(), request.getPartidoId(), request.getCargoId());
            if (existeCandidato) {
                throw new DuplicateEntityException("Ya existe un candidato del partido '" + partido.getNombre() + 
                    "' para el cargo de '" + cargo.getNombre() + "' en esta elección");
            }
        }
        
        Candidato candidato = Candidato.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .partido(partido)
                .cargo(cargo)
                .fotoUrl(request.getFotoUrl())
                .elecciones(eleccion)
                .build();
        
        log.info("Creando {}: {}", "Candidato", candidato.getNombre() + " " + candidato.getApellido());
        Candidato saved = candidatoRepository.save(candidato);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.CREATE,
            "Candidato",
            saved.getId(),
            null,
            Map.of("nombre", saved.getNombre(), "apellido", saved.getApellido())
        );
        return mapToResponse(saved);
    }

    @Transactional
    public CandidatoResponse updateCandidato(Long id, CandidatoRequest request) {
        Candidato candidato = candidatoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Candidato no encontrado con ID: " + id));

        Long partidoId = request.getPartidoId() != null ? request.getPartidoId() :
                (candidato.getPartido() != null ? candidato.getPartido().getId() : null);
        if (partidoId != null && request.getCargoId() != null &&
                (!partidoId.equals(candidato.getPartido() != null ? candidato.getPartido().getId() : null) ||
                 !request.getCargoId().equals(candidato.getCargo().getId())) &&
                candidatoRepository.existsByEleccionesIdAndPartidoIdAndCargoId(
                    candidato.getElecciones().getId(), partidoId, request.getCargoId())) {
            throw new DuplicateEntityException("Ya existe un candidato para este partido y cargo en esta elección");
        }
        log.info("Actualizando {} con ID: {}", "Candidato", id);
        Map<String, Object> datosAnteriores = Map.of("nombre", candidato.getNombre(), "apellido", candidato.getApellido());
        candidato.setNombre(request.getNombre());
        candidato.setApellido(request.getApellido());
        candidato.setFotoUrl(request.getFotoUrl());
        
        if (request.getCargoId() != null) {
            Cargo cargo = cargoRepository.findById(request.getCargoId())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Cargo no encontrado con ID: " + request.getCargoId()));
            candidato.setCargo(cargo);
        }
        
        if (request.getPartidoId() != null) {
            Partido partido = partidoRepository.findById(request.getPartidoId())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Partido no encontrado con ID: " + request.getPartidoId()));
            candidato.setPartido(partido);
        }
        
        Candidato saved = candidatoRepository.save(candidato);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.UPDATE,
            "Candidato",
            id,
            datosAnteriores,
            Map.of("nombre", saved.getNombre(), "apellido", saved.getApellido())
        );
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteCandidato(Long id) {
        if (!candidatoRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Candidato no encontrado con ID: " + id);
        }
        log.warn("Eliminando {} con ID: {}", "Candidato", id);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.DELETE,
            "Candidato",
            id,
            null,
            null
        );
        candidatoRepository.deleteById(id);
    }

    private CandidatoResponse mapToResponse(Candidato candidato) {
        return CandidatoResponse.builder()
                .id(candidato.getId())
                .nombre(candidato.getNombre())
                .apellido(candidato.getApellido())
                .nombreCompleto(candidato.getNombreCompleto())
                .partidoId(candidato.getPartido() != null ? candidato.getPartido().getId() : null)
                .partidoNombre(candidato.getPartido() != null ? candidato.getPartido().getNombre() : "Independiente")
                .partidoSigla(candidato.getPartido() != null ? candidato.getPartido().getSigla() : null)
                .cargoId(candidato.getCargo().getId())
                .cargoNombre(candidato.getCargo().getNombre())
                .fotoUrl(candidato.getFotoUrl())
                .eleccionesId(candidato.getElecciones().getId())
                .build();
    }
}