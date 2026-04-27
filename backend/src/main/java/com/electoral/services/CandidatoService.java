package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.exception.ValidacionException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CandidatoService {
    private final CandidatoRepository candidatoRepository;
    private final PartidoRepository partidoRepository;
    private final CargoRepository cargoRepository;
    private final EleccionService eleccionService;

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
                throw new ValidacionException("Ya existe un candidato del partido '" + partido.getNombre() + 
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
        
        return mapToResponse(candidatoRepository.save(candidato));
    }

    @Transactional
    public CandidatoResponse updateCandidato(Long id, CandidatoRequest request) {
        Candidato candidato = candidatoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Candidato no encontrado con ID: " + id));
        
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
        
        return mapToResponse(candidatoRepository.save(candidato));
    }

    @Transactional
    public void deleteCandidato(Long id) {
        if (!candidatoRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Candidato no encontrado con ID: " + id);
        }
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