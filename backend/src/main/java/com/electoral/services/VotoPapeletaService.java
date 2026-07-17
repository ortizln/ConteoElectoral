package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class VotoPapeletaService {

    private final VotoPapeletaRepository votoPapeletaRepository;
    private final OpcionPapeletaRepository opcionPapeletaRepository;
    private final MesaRepository mesaRepository;
    private final EleccionService eleccionService;

    @Transactional
    public VotoPapeletaResponse registrarVoto(VotoPapeletaRequest request) {
        OpcionPapeleta opcion = opcionPapeletaRepository.findById(request.getOpcionPapeletaId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Opción de papeleta no encontrada"));

        Mesa mesa = mesaRepository.findById(request.getMesaId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada"));

        if (mesa.getCerrada()) {
            throw new IllegalStateException("La mesa está cerrada");
        }

        VotoPapeleta voto = votoPapeletaRepository
                .findByOpcionPapeletaIdAndMesaId(request.getOpcionPapeletaId(), request.getMesaId())
                .orElse(null);

        if (voto != null) {
            voto.setCantidadVotos(request.getCantidadVotos());
        } else {
            voto = VotoPapeleta.builder()
                    .opcionPapeleta(opcion)
                    .mesa(mesa)
                    .elecciones(mesa.getElecciones())
                    .cantidadVotos(request.getCantidadVotos())
                    .build();
        }

        VotoPapeleta saved = votoPapeletaRepository.save(voto);
        log.info("Voto papeleta registrado: opcion={}, mesa={}, votos={}",
                saved.getOpcionPapeleta().getId(), saved.getMesa().getId(), saved.getCantidadVotos());
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<VotoPapeletaResponse> getVotosByMesa(Long mesaId) {
        return votoPapeletaRepository.findByMesaId(mesaId).stream()
                .map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<VotoPapeletaResponse> getVotosByEleccion(Long eleccionId) {
        return votoPapeletaRepository.findByEleccionesId(eleccionId).stream()
                .map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional
    public void eliminarVoto(Long id) {
        if (!votoPapeletaRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Voto no encontrado");
        }
        votoPapeletaRepository.deleteById(id);
    }

    private VotoPapeletaResponse mapToResponse(VotoPapeleta voto) {
        return VotoPapeletaResponse.builder()
                .id(voto.getId())
                .opcionPapeletaId(voto.getOpcionPapeleta().getId())
                .opcionEtiqueta(voto.getOpcionPapeleta().getEtiqueta())
                .mesaId(voto.getMesa().getId())
                .cantidadVotos(voto.getCantidadVotos())
                .build();
    }
}
