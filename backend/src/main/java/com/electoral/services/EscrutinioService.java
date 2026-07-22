package com.electoral.services;

import com.electoral.annotation.Auditable;
import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class EscrutinioService {

    private final ReconteoRepository reconteoRepository;
    private final ImpugnacionRepository impugnacionRepository;
    private final ObservacionRepository observacionRepository;
    private final ResolucionRepository resolucionRepository;
    private final MesaRepository mesaRepository;
    private final UsuarioRepository usuarioRepository;

    // === RECONTEO ===

    @Transactional(readOnly = true)
    public List<ReconteoResponse> listarReconteos(Long eleccionId) {
        return reconteoRepository.findByMesaEleccionesIdOrderByCreatedAtDesc(eleccionId).stream()
                .map(this::mapReconteo).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReconteoResponse> listarReconteosPorMesa(Long mesaId) {
        return reconteoRepository.findByMesaIdOrderByCreatedAtDesc(mesaId).stream()
                .map(this::mapReconteo).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ReconteoResponse obtenerReconteo(Long id) {
        Reconteo r = reconteoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Reconteo no encontrado: " + id));
        return mapReconteo(r);
    }

    @Transactional
    @Auditable(entidad = "Reconteo")
    public ReconteoResponse crearReconteo(ReconteoRequest request) {
        Mesa mesa = mesaRepository.findById(request.getMesaId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada: " + request.getMesaId()));
        Reconteo r = Reconteo.builder()
                .mesa(mesa).motivo(request.getMotivo())
                .solicitadoPor(request.getSolicitadoPor())
                .estado("PENDIENTE").build();
        Reconteo saved = reconteoRepository.save(r);
        log.info("Reconteo solicitado para mesa {}: {}", mesa.getNumero(), saved.getId());
        return mapReconteo(saved);
    }

    @Transactional
    @Auditable(entidad = "Reconteo")
    public ReconteoResponse actualizarEstadoReconteo(Long id, String estado, String resultado, String realizadoPor) {
        Reconteo r = reconteoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Reconteo no encontrado: " + id));
        r.setEstado(estado);
        if (resultado != null) r.setResultado(resultado);
        if (realizadoPor != null) r.setRealizadoPor(realizadoPor);
        if ("COMPLETADO".equals(estado) || "EN_PROCESO".equals(estado)) {
            r.setFechaRealizacion(LocalDateTime.now());
        }
        Reconteo saved = reconteoRepository.save(r);
        return mapReconteo(saved);
    }

    // === IMPUGNACIONES ===

    @Transactional(readOnly = true)
    public List<ImpugnacionResponse> listarImpugnaciones(Long eleccionId) {
        return impugnacionRepository.findByMesaEleccionesIdOrderByCreatedAtDesc(eleccionId).stream()
                .map(this::mapImpugnacion).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ImpugnacionResponse obtenerImpugnacion(Long id) {
        Impugnacion i = impugnacionRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Impugnación no encontrada: " + id));
        return mapImpugnacion(i);
    }

    @Transactional
    @Auditable(entidad = "Impugnacion")
    public ImpugnacionResponse crearImpugnacion(ImpugnacionRequest request) {
        Mesa mesa = request.getMesaId() != null
                ? mesaRepository.findById(request.getMesaId()).orElse(null) : null;
        Impugnacion i = Impugnacion.builder()
                .mesa(mesa).tipo(request.getTipo())
                .descripcion(request.getDescripcion())
                .solicitante(request.getSolicitante())
                .estado("PENDIENTE").build();
        Impugnacion saved = impugnacionRepository.save(i);
        log.info("Impugnación creada: {} - {}", saved.getTipo(), saved.getId());
        return mapImpugnacion(saved);
    }

    @Transactional
    @Auditable(entidad = "Impugnacion")
    public ImpugnacionResponse actualizarEstadoImpugnacion(Long id, String estado) {
        Impugnacion i = impugnacionRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Impugnación no encontrada: " + id));
        i.setEstado(estado);
        Impugnacion saved = impugnacionRepository.save(i);
        return mapImpugnacion(saved);
    }

    // === OBSERVACIONES ===

    @Transactional(readOnly = true)
    public List<ObservacionResponse> listarObservaciones(Long eleccionId) {
        return observacionRepository.findByMesaEleccionesIdOrderByCreatedAtDesc(eleccionId).stream()
                .map(this::mapObservacion).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ObservacionResponse> listarObservacionesPorMesa(Long mesaId) {
        return observacionRepository.findByMesaIdOrderByCreatedAtDesc(mesaId).stream()
                .map(this::mapObservacion).collect(Collectors.toList());
    }

    @Transactional
    @Auditable(entidad = "Observacion")
    public ObservacionResponse crearObservacion(ObservacionRequest request, Long usuarioId) {
        Mesa mesa = request.getMesaId() != null
                ? mesaRepository.findById(request.getMesaId()).orElse(null) : null;
        Usuario usuario = usuarioId != null
                ? usuarioRepository.findById(usuarioId).orElse(null) : null;
        Observacion o = Observacion.builder()
                .mesa(mesa).usuario(usuario)
                .tipo(request.getTipo()).descripcion(request.getDescripcion()).build();
        Observacion saved = observacionRepository.save(o);
        return mapObservacion(saved);
    }

    // === RESOLUCIONES ===

    @Transactional(readOnly = true)
    public List<ResolucionResponse> listarResoluciones() {
        return resolucionRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapResolucion).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ResolucionResponse obtenerResolucion(Long id) {
        Resolucion r = resolucionRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Resolución no encontrada: " + id));
        return mapResolucion(r);
    }

    @Transactional
    @Auditable(entidad = "Resolucion")
    public ResolucionResponse crearResolucion(ResolucionRequest request) {
        Impugnacion impugnacion = request.getImpugnacionId() != null
                ? impugnacionRepository.findById(request.getImpugnacionId()).orElse(null) : null;
        Resolucion r = Resolucion.builder()
                .codigo(request.getCodigo()).titulo(request.getTitulo())
                .descripcion(request.getDescripcion())
                .impugnacion(impugnacion)
                .resueltoPor(request.getResueltoPor())
                .detalle(request.getDetalle()).build();
        Resolucion saved = resolucionRepository.save(r);

        if (impugnacion != null) {
            impugnacion.setEstado("APROBADA");
            impugnacionRepository.save(impugnacion);
        }
        log.info("Resolución creada: {} - {}", saved.getCodigo(), saved.getTitulo());
        return mapResolucion(saved);
    }

    // === RESUMEN ===

    @Transactional(readOnly = true)
    public EscrutinioResumenResponse obtenerResumen() {
        return EscrutinioResumenResponse.builder()
                .reconteosPendientes(reconteoRepository.countByEstado("PENDIENTE")
                        + reconteoRepository.countByEstado("EN_PROCESO"))
                .impugnacionesPendientes(impugnacionRepository.countByEstado("PENDIENTE")
                        + impugnacionRepository.countByEstado("EN_REVISION"))
                .totalObservaciones(observacionRepository.count())
                .totalResoluciones(resolucionRepository.count())
                .build();
    }

    // === MAPPERS ===

    private ReconteoResponse mapReconteo(Reconteo r) {
        return ReconteoResponse.builder()
                .id(r.getId()).mesaId(r.getMesa().getId())
                .mesaNumero(r.getMesa().getNumero())
                .institucionNombre(r.getMesa().getInstitucion() != null
                        ? r.getMesa().getInstitucion().getNombre() : null)
                .motivo(r.getMotivo()).solicitadoPor(r.getSolicitadoPor())
                .fechaSolicitud(r.getFechaSolicitud()).estado(r.getEstado())
                .resultado(r.getResultado()).realizadoPor(r.getRealizadoPor())
                .fechaRealizacion(r.getFechaRealizacion()).createdAt(r.getCreatedAt()).build();
    }

    private ImpugnacionResponse mapImpugnacion(Impugnacion i) {
        return ImpugnacionResponse.builder()
                .id(i.getId()).mesaId(i.getMesa() != null ? i.getMesa().getId() : null)
                .mesaNumero(i.getMesa() != null ? i.getMesa().getNumero() : null)
                .tipo(i.getTipo()).descripcion(i.getDescripcion())
                .solicitante(i.getSolicitante())
                .fechaImpugnacion(i.getFechaImpugnacion()).estado(i.getEstado())
                .createdAt(i.getCreatedAt()).build();
    }

    private ObservacionResponse mapObservacion(Observacion o) {
        return ObservacionResponse.builder()
                .id(o.getId()).mesaId(o.getMesa() != null ? o.getMesa().getId() : null)
                .mesaNumero(o.getMesa() != null ? o.getMesa().getNumero() : null)
                .usuarioId(o.getUsuario() != null ? o.getUsuario().getId() : null)
                .usuarioNombre(o.getUsuario() != null
                        ? o.getUsuario().getNombre() + " " + o.getUsuario().getApellido() : null)
                .tipo(o.getTipo()).descripcion(o.getDescripcion())
                .fecha(o.getFecha()).createdAt(o.getCreatedAt()).build();
    }

    private ResolucionResponse mapResolucion(Resolucion r) {
        return ResolucionResponse.builder()
                .id(r.getId()).codigo(r.getCodigo()).titulo(r.getTitulo())
                .descripcion(r.getDescripcion())
                .impugnacionId(r.getImpugnacion() != null ? r.getImpugnacion().getId() : null)
                .impugnacionDescripcion(r.getImpugnacion() != null
                        ? r.getImpugnacion().getDescripcion() : null)
                .resueltoPor(r.getResueltoPor())
                .fechaResolucion(r.getFechaResolucion()).detalle(r.getDetalle())
                .createdAt(r.getCreatedAt()).build();
    }
}
