package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import java.util.HashMap;
import java.util.Map;
import com.electoral.util.SecurityUtil;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class MesaService {
    private final MesaRepository mesaRepository;
    private final InstitucionEducativaRepository institucionRepository;
    private final EleccionService eleccionService;
    private final MesaUsuarioRepository mesaUsuarioRepository;
    private final AuditoriaService auditoriaService;
    private final SecurityUtil securityUtil;
    private final SimpMessagingTemplate messagingTemplate;
    private final PdfExportService pdfExportService;
    private final VotoRepository votoRepository;

    @Transactional(readOnly = true)
    public List<MesaResponse> getMesasByEleccion(Long eleccionesId) {
        return mesaRepository.findByEleccionesId(eleccionesId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MesaResponse> getMesasByUsuario(Long usuarioId, Long eleccionId) {
        return mesaUsuarioRepository.findByUsuarioIdAndEleccionId(usuarioId, eleccionId)
                .stream()
                .map(MesaUsuario::getMesa)
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

    @Transactional(readOnly = true)
    public Mesa getMesaEntityById(Long id) {
        return mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
    }

    @Transactional(readOnly = true)
    public Mesa getMesaWithAll(Long id) {
        return mesaRepository.findByIdWithAll(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
    }

    @Transactional(readOnly = true)
    public byte[] exportarActaMesa(Long mesaId) {
        Mesa mesa = mesaRepository.findByIdWithAll(mesaId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + mesaId));

        List<com.electoral.dto.VotoResponse> votos = votoRepository.findByMesaId(mesaId).stream()
                .map(v -> com.electoral.dto.VotoResponse.builder()
                        .id(v.getId())
                        .candidatoId(v.getCandidato().getId())
                        .candidatoNombre(v.getCandidato().getNombre())
                        .candidatoApellido(v.getCandidato().getApellido())
                        .partidoNombre(v.getCandidato().getPartido() != null
                                ? v.getCandidato().getPartido().getNombre() : "Independiente")
                        .mesaId(v.getMesa().getId())
                        .mesaNumero(v.getMesa().getNumero())
                        .cantidadVotos(v.getCantidadVotos())
                        .eleccionesId(v.getElecciones().getId())
                        .build())
                .collect(Collectors.toList());

        Long totalVotos = votos.stream().mapToLong(com.electoral.dto.VotoResponse::getCantidadVotos).sum();

        List<String[]> resultados = votos.stream()
                .map(v -> new String[]{v.getCandidatoNombre() + " " + v.getCandidatoApellido(),
                        v.getPartidoNombre(), " ", String.valueOf(v.getCantidadVotos())})
                .collect(Collectors.toList());

        String institucionNombre = mesa.getInstitucion() != null ? mesa.getInstitucion().getNombre() : "";
        String parroquiaNombre = mesa.getInstitucion() != null && mesa.getInstitucion().getParroquia() != null
                ? mesa.getInstitucion().getParroquia().getNombre() : "";
        String cantonNombre = mesa.getInstitucion() != null && mesa.getInstitucion().getParroquia() != null
                && mesa.getInstitucion().getParroquia().getCanton() != null
                ? mesa.getInstitucion().getParroquia().getCanton().getNombre() : "";
        String provinciaNombre = mesa.getInstitucion() != null && mesa.getInstitucion().getParroquia() != null
                && mesa.getInstitucion().getParroquia().getCanton() != null
                && mesa.getInstitucion().getParroquia().getCanton().getProvincia() != null
                ? mesa.getInstitucion().getParroquia().getCanton().getProvincia().getNombre() : "";
        String zonaNombre = mesa.getInstitucion() != null && mesa.getInstitucion().getParroquia() != null
                && mesa.getInstitucion().getParroquia().getCanton() != null
                && mesa.getInstitucion().getParroquia().getCanton().getProvincia() != null
                && mesa.getInstitucion().getParroquia().getCanton().getProvincia().getZona() != null
                ? mesa.getInstitucion().getParroquia().getCanton().getProvincia().getZona().getNombre() : "";
        String eleccionNombre = mesa.getElecciones() != null ? mesa.getElecciones().getNombre() : "";

        return pdfExportService.exportActaMesa(mesa, institucionNombre, parroquiaNombre,
                cantonNombre, provinciaNombre, zonaNombre, eleccionNombre,
                resultados, totalVotos, LocalDateTime.now());
    }

    @Transactional
    public MesaResponse createMesa(MesaRequest request) {
        Mesa.SexoMesa sexo = Mesa.SexoMesa.valueOf(request.getSexo());
        if (mesaRepository.existsByNumeroAndSexoAndInstitucionId(request.getNumero(), sexo, request.getInstitucionId())) {
            throw new DuplicateEntityException("Ya existe una mesa '" + request.getNumero() + "' del sexo '" + request.getSexo() + "' en esta institución");
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

        log.info("Creando {}: {}", "Mesa", mesa.getNumero());
        Mesa saved = mesaRepository.save(mesa);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.CREATE,
            "Mesa",
            saved.getId(),
            null,
            Map.of("numero", saved.getNumero(), "sexo", saved.getSexo().name())
        );
        return mapToResponse(saved);
    }

    @Transactional
    public MesaResponse updateMesa(Long id, MesaRequest request) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));

        if (request.getNumero() != null || request.getSexo() != null) {
            String nuevoNumero = request.getNumero() != null ? request.getNumero() : mesa.getNumero();
            Mesa.SexoMesa nuevoSexo = request.getSexo() != null ? Mesa.SexoMesa.valueOf(request.getSexo()) : mesa.getSexo();
            if ((request.getNumero() != null && !mesa.getNumero().equals(nuevoNumero)) ||
                (request.getSexo() != null && !mesa.getSexo().equals(nuevoSexo))) {
                if (mesaRepository.existsByNumeroAndSexoAndInstitucionIdAndIdNot(nuevoNumero, nuevoSexo, mesa.getInstitucion().getId(), id)) {
                    throw new DuplicateEntityException("Ya existe una mesa '" + nuevoNumero + "' del sexo '" + nuevoSexo.name() + "' en esta institución");
                }
            }
        }
        log.info("Actualizando {} con ID: {}", "Mesa", id);
        Map<String, Object> datosAnteriores = Map.of("numero", mesa.getNumero(), "sexo", mesa.getSexo().name());
        if (request.getNumero() != null) mesa.setNumero(request.getNumero());
        if (request.getSexo() != null) mesa.setSexo(Mesa.SexoMesa.valueOf(request.getSexo()));

        Mesa saved = mesaRepository.save(mesa);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.UPDATE,
            "Mesa",
            id,
            datosAnteriores,
            Map.of("numero", saved.getNumero(), "sexo", saved.getSexo().name())
        );
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteMesa(Long id) {
        if (!mesaRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id);
        }
        log.warn("Eliminando {} con ID: {}", "Mesa", id);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.DELETE,
            "Mesa",
            id,
            null,
            null
        );
        mesaRepository.deleteById(id);
    }

    @Transactional
    public MesaResponse actualizarVotosNulos(Long id, Integer votosNulos) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
        mesa.setVotosNulos(votosNulos != null ? votosNulos : 0);
        MesaResponse response = mapToResponse(mesaRepository.save(mesa));
        notifyDataChanged(mesa.getElecciones().getId());
        return response;
    }

    @Transactional
    public MesaResponse actualizarVotosBlanco(Long id, Integer votosBlanco) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
        mesa.setVotosBlanco(votosBlanco != null ? votosBlanco : 0);
        MesaResponse response = mapToResponse(mesaRepository.save(mesa));
        notifyDataChanged(mesa.getElecciones().getId());
        return response;
    }

    @Transactional
    public MesaResponse cerrarMesa(Long id) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
        
        if (mesa.getCerrada()) {
            throw new IllegalStateException("La mesa ya está cerrada");
        }
        
        mesa.setCerrada(true);
        MesaResponse response = mapToResponse(mesaRepository.save(mesa));
        notifyMesaEstado(mesa.getElecciones().getId(), id, true);
        return response;
    }

    @Transactional
    public MesaResponse reabrirMesa(Long id) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
        
        if (!mesa.getCerrada()) {
            throw new IllegalStateException("La mesa no está cerrada");
        }
        
        mesa.setCerrada(false);
        MesaResponse response = mapToResponse(mesaRepository.save(mesa));
        notifyMesaEstado(mesa.getElecciones().getId(), id, false);
        return response;
    }

    private void notifyDataChanged(Long eleccionId) {
        try {
            Map<String, Object> msg = new HashMap<>();
            msg.put("tipo", "data-changed");
            messagingTemplate.convertAndSend("/topic/resultados/" + eleccionId, msg);
        } catch (Exception e) {
            log.warn("Error sending WS data changed notification: {}", e.getMessage());
        }
    }

    private void notifyMesaEstado(Long eleccionId, Long mesaId, boolean cerrada) {
        try {
            Map<String, Object> message = new HashMap<>();
            message.put("tipo", "mesa-estado");
            message.put("mesaId", mesaId);
            message.put("cerrada", cerrada);
            messagingTemplate.convertAndSend("/topic/mesa-estado/" + eleccionId, message);
        } catch (Exception e) {
            log.warn("Error sending WS notification: {}", e.getMessage());
        }
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
                .votosNulos(mesa.getVotosNulos())
                .votosBlanco(mesa.getVotosBlanco())
                .usuarioId(usuarioId)
                .usuarioNombre(usuarioNombre)
                .build();
    }

    private final UsuarioRepository usuarioRepository;
}