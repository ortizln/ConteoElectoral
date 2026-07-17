package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.DuplicateEntityException;
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
public class ListaElectoralService {

    private final ListaElectoralRepository listaRepository;
    private final CandidatoRepository candidatoRepository;
    private final EleccionService eleccionService;
    private final CargoRepository cargoRepository;
    private final PartidoRepository partidoRepository;

    @Transactional(readOnly = true)
    public List<ListaElectoralResponse> getListasByEleccion(Long eleccionId) {
        return listaRepository.findByEleccionId(eleccionId).stream()
                .map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ListaElectoralResponse> getListasByCargoYCircunscripcion(
            Long eleccionId, Long cargoId, String circTipo, Long circId) {
        return listaRepository
                .findByEleccionIdAndCargoIdAndCircunscripcionIdAndCircunscripcionTipo(
                        eleccionId, cargoId, circId, circTipo)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional
    public ListaElectoralResponse crearLista(ListaElectoralRequest request) {
        if (listaRepository.existsByEleccionIdAndCargoIdAndPartidoIdAndCircunscripcionTipoAndCircunscripcionId(
                request.getEleccionId(), request.getCargoId(), request.getPartidoId(),
                request.getCircunscripcionTipo(), request.getCircunscripcionId())) {
            throw new DuplicateEntityException("Ya existe una lista para este partido, cargo y circunscripción");
        }

        Eleccion eleccion = eleccionService.getEleccionEntityById(request.getEleccionId());
        Cargo cargo = cargoRepository.findById(request.getCargoId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Cargo no encontrado"));
        Partido partido = request.getPartidoId() != null
                ? partidoRepository.findById(request.getPartidoId())
                        .orElseThrow(() -> new RecursoNoEncontradoException("Partido no encontrado"))
                : null;

        ListaElectoral lista = ListaElectoral.builder()
                .eleccion(eleccion).cargo(cargo).partido(partido)
                .circunscripcionTipo(request.getCircunscripcionTipo())
                .circunscripcionId(request.getCircunscripcionId())
                .numeroLista(request.getNumeroLista())
                .nombre(request.getNombre())
                .build();

        ListaElectoral saved = listaRepository.save(lista);
        log.info("Lista electoral creada: {} - nro {}", saved.getNombre(), saved.getNumeroLista());
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public ListaElectoralDetalleResponse getListaDetalle(Long id) {
        ListaElectoral lista = listaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Lista no encontrada"));
        List<Candidato> candidatos = candidatoRepository.findByListaIdOrderByOrdenEnLista(id);
        return ListaElectoralDetalleResponse.builder()
                .id(lista.getId())
                .numeroLista(lista.getNumeroLista())
                .nombre(lista.getNombre())
                .eleccionId(lista.getEleccion().getId())
                .cargoId(lista.getCargo().getId())
                .cargoNombre(lista.getCargo().getNombre())
                .partidoId(lista.getPartido() != null ? lista.getPartido().getId() : null)
                .partidoNombre(lista.getPartido() != null ? lista.getPartido().getNombre() : null)
                .partidoSigla(lista.getPartido() != null ? lista.getPartido().getSigla() : null)
                .circunscripcionTipo(lista.getCircunscripcionTipo())
                .circunscripcionId(lista.getCircunscripcionId())
                .estado(lista.getEstado())
                .candidatos(candidatos.stream().map(c -> CandidatoResponse.builder()
                        .id(c.getId()).nombre(c.getNombre()).apellido(c.getApellido())
                        .nombreCompleto(c.getNombreCompleto())
                        .ordenEnLista(c.getOrdenEnLista())
                        .tipo(c.getTipo())
                        .fotoUrl(c.getFotoUrl())
                        .build()).collect(Collectors.toList()))
                .build();
    }

    private ListaElectoralResponse mapToResponse(ListaElectoral l) {
        return ListaElectoralResponse.builder()
                .id(l.getId())
                .numeroLista(l.getNumeroLista())
                .nombre(l.getNombre())
                .eleccionId(l.getEleccion().getId())
                .cargoId(l.getCargo().getId())
                .cargoNombre(l.getCargo().getNombre())
                .partidoId(l.getPartido() != null ? l.getPartido().getId() : null)
                .partidoNombre(l.getPartido() != null ? l.getPartido().getNombre() : null)
                .partidoSigla(l.getPartido() != null ? l.getPartido().getSigla() : null)
                .circunscripcionTipo(l.getCircunscripcionTipo())
                .circunscripcionId(l.getCircunscripcionId())
                .estado(l.getEstado())
                .build();
    }
}
