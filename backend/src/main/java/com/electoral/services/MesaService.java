package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.exception.ValidacionException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
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
    private final MesaNuloBlancoRepository mesaNuloBlancoRepository;
    private final CargoRepository cargoRepository;
    private final ListaElectoralRepository listaElectoralRepository;
    private final MesaActaFotoRepository mesaActaFotoRepository;

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

        Map<Long, ListaElectoral> listasPorId = new HashMap<>();
        if (mesa.getElecciones() != null) {
            for (ListaElectoral lista : listaElectoralRepository.findByEleccionId(mesa.getElecciones().getId())) {
                listasPorId.put(lista.getId(), lista);
            }
        }

        // El acta debe reflejar tanto votos individuales como votos por lista.
        List<String[]> resultados = new ArrayList<>();
        long totalVotos = 0L;
        for (Voto voto : votoRepository.findByMesaId(mesaId)) {
            String nombre;
            String partido;
            String cargo;
            if (voto.getCandidato() != null) {
                nombre = voto.getCandidato().getNombreCompleto();
                partido = voto.getCandidato().getPartido() != null
                        ? voto.getCandidato().getPartido().getNombre() : "Independiente";
                cargo = voto.getCandidato().getCargo() != null
                        ? voto.getCandidato().getCargo().getNombre() : "";
            } else if (voto.getListaId() != null && listasPorId.containsKey(voto.getListaId())) {
                ListaElectoral lista = listasPorId.get(voto.getListaId());
                nombre = lista.getNombre();
                partido = lista.getPartido() != null ? lista.getPartido().getNombre() : "Independiente";
                cargo = lista.getCargo() != null ? lista.getCargo().getNombre() : "";
            } else {
                continue;
            }
            resultados.add(new String[]{nombre, partido, cargo,
                    String.valueOf(voto.getCantidadVotos())});
            totalVotos += voto.getCantidadVotos() == null ? 0L : voto.getCantidadVotos();
        }

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

    /**
     * ADMIN/SUPERVISOR pueden corregir mesas cerradas; MIEMBRO_MESA solo mientras
     * la mesa esté abierta y el acta no haya sido aprobada.
     */
    public void validarEdicionConteo(Mesa mesa) {
        Usuario usuario = securityUtil.getCurrentUser();
        boolean privilegiado = usuario != null && usuario.getRol() != null
                && ("ADMIN".equals(usuario.getRol().getNombre())
                || "SUPERVISOR".equals(usuario.getRol().getNombre()));
        if (privilegiado) return;
        if (Boolean.TRUE.equals(mesa.getCerrada())) {
            throw new IllegalStateException("La mesa está cerrada");
        }
        if (Boolean.TRUE.equals(mesa.getAprobada())) {
            throw new ValidacionException("El acta de esta mesa ya fue aprobada y no admite cambios");
        }
    }

    @Transactional
    public MesaResponse actualizarVotosNulos(Long id, Integer votosNulos) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
        validarEdicionConteo(mesa);
        int total = votosNulos != null ? Math.max(0, votosNulos) : 0;
        mesa.setVotosNulos(total);
        sincronizarDesgloseNulosBlancos(id, MesaNuloBlanco.Tipo.NULO.name(), total);
        MesaResponse response = mapToResponse(mesaRepository.save(mesa));
        notifyDataChanged(mesa.getElecciones().getId());
        return response;
    }

    @Transactional
    public MesaResponse actualizarVotosBlanco(Long id, Integer votosBlanco) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
        validarEdicionConteo(mesa);
        int total = votosBlanco != null ? Math.max(0, votosBlanco) : 0;
        mesa.setVotosBlanco(total);
        sincronizarDesgloseNulosBlancos(id, MesaNuloBlanco.Tipo.BLANCO.name(), total);
        MesaResponse response = mapToResponse(mesaRepository.save(mesa));
        notifyDataChanged(mesa.getElecciones().getId());
        return response;
    }

    /**
     * Mantiene el desglose por cargo consistente con el total global (rutas legacy/sync
     * de la app móvil): ajusta la fila del cargo por defecto (Alcaldes o el primero)
     * para que la suma por cargos coincida con el total recibido.
     */
    @Transactional
    public void sincronizarDesgloseNulosBlancos(Long mesaId, String tipo, int total) {
        Mesa mesa = mesaRepository.findById(mesaId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + mesaId));
        List<Cargo> cargos = cargoRepository.findByEleccionesId(mesa.getElecciones().getId());
        if (cargos.isEmpty()) {
            return;
        }
        Cargo cargoDefault = cargos.stream()
                .filter(c -> c.getNombre() != null && c.getNombre().toUpperCase().contains("ALCALDE"))
                .findFirst()
                .orElse(cargos.get(0));
        int sumaOtros = 0;
        for (MesaNuloBlanco nb : mesaNuloBlancoRepository.findByMesaId(mesaId)) {
            if (tipo.equals(nb.getTipo()) && !cargoDefault.getId().equals(nb.getCargo().getId())) {
                sumaOtros += nb.getCantidad();
            }
        }
        MesaNuloBlanco registro = mesaNuloBlancoRepository
                .findByMesaIdAndCargoIdAndTipo(mesaId, cargoDefault.getId(), tipo)
                .orElseGet(() -> MesaNuloBlanco.builder()
                        .mesa(mesa)
                        .cargo(cargoDefault)
                        .tipo(tipo)
                        .cantidad(0)
                        .build());
        registro.setCantidad(Math.max(0, total - sumaOtros));
        mesaNuloBlancoRepository.save(registro);
    }

    @Transactional(readOnly = true)
    public List<MesaNuloBlancoPorCargoResponse> getNulosBlancosPorCargo(Long mesaId) {
        Mesa mesa = mesaRepository.findById(mesaId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + mesaId));
        List<Cargo> cargos = cargoRepository.findByEleccionesId(mesa.getElecciones().getId());
        Map<Long, MesaNuloBlancoPorCargoResponse> porCargo = new LinkedHashMap<>();
        for (Cargo cargo : cargos) {
            porCargo.put(cargo.getId(), MesaNuloBlancoPorCargoResponse.builder()
                    .cargoId(cargo.getId())
                    .cargoNombre(cargo.getNombre())
                    .nulos(0)
                    .blancos(0)
                    .build());
        }
        for (MesaNuloBlanco nb : mesaNuloBlancoRepository.findByMesaId(mesaId)) {
            MesaNuloBlancoPorCargoResponse r = porCargo.get(nb.getCargo().getId());
            if (r == null) {
                continue;
            }
            if (MesaNuloBlanco.Tipo.NULO.name().equals(nb.getTipo())) {
                r.setNulos(nb.getCantidad());
            } else if (MesaNuloBlanco.Tipo.BLANCO.name().equals(nb.getTipo())) {
                r.setBlancos(nb.getCantidad());
            }
        }
        return new ArrayList<>(porCargo.values());
    }

    @Transactional
    public MesaResponse actualizarNulosBlancos(Long mesaId, MesaNuloBlancoRequest request) {
        Mesa mesa = mesaRepository.findById(mesaId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + mesaId));
        validarEdicionConteo(mesa);
        String tipo = request.getTipo() != null ? request.getTipo().toUpperCase() : "";
        if (!MesaNuloBlanco.Tipo.NULO.name().equals(tipo) && !MesaNuloBlanco.Tipo.BLANCO.name().equals(tipo)) {
            throw new IllegalArgumentException("Tipo inválido (debe ser NULO o BLANCO)");
        }
        Cargo cargo = cargoRepository.findById(request.getCargoId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Cargo no encontrado con ID: " + request.getCargoId()));
        if (cargo.getElecciones() == null || mesa.getElecciones() == null
                || !cargo.getElecciones().getId().equals(mesa.getElecciones().getId())) {
            throw new IllegalArgumentException("El cargo no pertenece a la elección de la mesa");
        }

        MesaNuloBlanco registro = mesaNuloBlancoRepository
                .findByMesaIdAndCargoIdAndTipo(mesaId, cargo.getId(), tipo)
                .orElseGet(() -> MesaNuloBlanco.builder()
                        .mesa(mesa)
                        .cargo(cargo)
                        .tipo(tipo)
                        .cantidad(0)
                        .build());
        registro.setCantidad(request.getCantidad());
        mesaNuloBlancoRepository.save(registro);

        // Recalcular totales globales = suma por cargos (compatibilidad reportes/acta/sync móvil)
        int totalNulos = 0;
        int totalBlanco = 0;
        for (MesaNuloBlanco nb : mesaNuloBlancoRepository.findByMesaId(mesaId)) {
            if (MesaNuloBlanco.Tipo.NULO.name().equals(nb.getTipo())) {
                totalNulos += nb.getCantidad();
            } else if (MesaNuloBlanco.Tipo.BLANCO.name().equals(nb.getTipo())) {
                totalBlanco += nb.getCantidad();
            }
        }
        mesa.setVotosNulos(totalNulos);
        mesa.setVotosBlanco(totalBlanco);
        MesaResponse response = mapToResponse(mesaRepository.save(mesa));
        notifyDataChanged(mesa.getElecciones().getId());
        return response;
    }

    /** Ausentes se registran manualmente por mesa, igual que nulos/blanco. */
    @Transactional
    public MesaResponse actualizarAusentes(Long id, Integer ausentes) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
        validarEdicionConteo(mesa);
        mesa.setAusentes(ausentes != null ? Math.max(0, ausentes) : 0);
        MesaResponse response = mapToResponse(mesaRepository.save(mesa));
        notifyDataChanged(mesa.getElecciones().getId());
        return response;
    }

    /** Corrección integral del acta por ADMIN/SUPERVISOR, incluso con la mesa cerrada. */
    @Transactional
    public MesaResponse corregirActa(Long mesaId, ActaCorreccionRequest request) {
        Mesa mesa = mesaRepository.findById(mesaId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + mesaId));
        if (Boolean.TRUE.equals(mesa.getAprobada())) {
            throw new ValidacionException("El acta ya fue aprobada; debe desaprobarla antes de corregirla");
        }
        if (request.getVotosNulos() != null) mesa.setVotosNulos(Math.max(0, request.getVotosNulos()));
        if (request.getVotosBlanco() != null) mesa.setVotosBlanco(Math.max(0, request.getVotosBlanco()));
        if (request.getAusentes() != null) mesa.setAusentes(Math.max(0, request.getAusentes()));
        if (request.getVotos() != null) {
            for (ActaCorreccionRequest.VotoCorreccion vc : request.getVotos()) {
                if (vc.getVotoId() == null || vc.getCantidadVotos() == null) continue;
                Voto voto = votoRepository.findById(vc.getVotoId())
                        .orElseThrow(() -> new RecursoNoEncontradoException("Voto no encontrado con ID: " + vc.getVotoId()));
                if (voto.getMesa() == null || !voto.getMesa().getId().equals(mesaId)) {
                    throw new ValidacionException("El voto " + vc.getVotoId() + " no pertenece a la mesa " + mesaId);
                }
                voto.setCantidadVotos(Math.max(0, vc.getCantidadVotos()));
                votoRepository.save(voto);
            }
        }
        MesaResponse response = mapToResponse(mesaRepository.save(mesa));
        auditoriaService.registrarAccion(
                securityUtil.getCurrentUserId(),
                Auditoria.TipoAccion.UPDATE,
                "Mesa",
                mesaId,
                Map.of("votosNulos", mesa.getVotosNulos() != null ? mesa.getVotosNulos() : 0,
                        "votosBlanco", mesa.getVotosBlanco() != null ? mesa.getVotosBlanco() : 0,
                        "ausentes", mesa.getAusentes() != null ? mesa.getAusentes() : 0),
                Map.of("correccion", true)
        );
        notifyDataChanged(mesa.getElecciones().getId());
        return response;
    }

    @Transactional
    public MesaResponse aprobarMesa(Long id) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
        if (!Boolean.TRUE.equals(mesa.getCerrada())) {
            throw new ValidacionException("Solo se puede aprobar un acta de una mesa cerrada");
        }
        mesa.setAprobada(true);
        MesaResponse response = mapToResponse(mesaRepository.save(mesa));
        auditoriaService.registrarAccion(
                securityUtil.getCurrentUserId(),
                Auditoria.TipoAccion.UPDATE,
                "Mesa",
                id,
                Map.of("aprobada", false), Map.of("aprobada", true));
        notifyDataChanged(mesa.getElecciones().getId());
        return response;
    }

    @Transactional
    public MesaResponse desaprobarMesa(Long id) {
        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + id));
        mesa.setAprobada(false);
        MesaResponse response = mapToResponse(mesaRepository.save(mesa));
        auditoriaService.registrarAccion(
                securityUtil.getCurrentUserId(),
                Auditoria.TipoAccion.UPDATE,
                "Mesa",
                id,
                Map.of("aprobada", true), Map.of("aprobada", false));
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
        validarEdicionConteo(mesa);

        // Obligatorio: respaldo fotográfico del acta antes de cerrar (vía REST/web).
        // La app móvil captura la foto antes de encolar el cierre y la sube al
        // reconectar, por lo que el cierre offline (sync/push) no se bloquea aquí.
        if (!mesaActaFotoRepository.existsByMesaId(id)) {
            throw new com.electoral.exception.ValidacionException(
                    "Debe subir la foto del acta antes de cerrar la mesa");
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

        // Territorio de la mesa: institucion -> parroquia -> canton -> provincia (nullable)
        InstitucionEducativa inst = mesa.getInstitucion();
        Parroquia parroquia = inst != null ? inst.getParroquia() : null;
        Canton canton = parroquia != null ? parroquia.getCanton() : null;
        Provincia provincia = canton != null ? canton.getProvincia() : null;

        return MesaResponse.builder()
                .id(mesa.getId())
                .numero(mesa.getNumero())
                .sexo(mesa.getSexo().name())
                .institucionId(inst != null ? inst.getId() : null)
                .institucionNombre(inst != null ? inst.getNombre() : null)
                .parroquiaId(parroquia != null ? parroquia.getId() : null)
                .parroquiaNombre(parroquia != null ? parroquia.getNombre() : null)
                .cantonId(canton != null ? canton.getId() : null)
                .cantonNombre(canton != null ? canton.getNombre() : null)
                .provinciaId(provincia != null ? provincia.getId() : null)
                .provinciaNombre(provincia != null ? provincia.getNombre() : null)
                .eleccionesId(mesa.getElecciones().getId())
                .cerrada(mesa.getCerrada())
                .votosNulos(mesa.getVotosNulos())
                .votosBlanco(mesa.getVotosBlanco())
                .ausentes(mesa.getAusentes())
                .aprobada(mesa.getAprobada())
                .electoresRegistrados(inst != null ? inst.getElectoresRegistrados() : null)
                .usuarioId(usuarioId)
                .usuarioNombre(usuarioNombre)
                .build();
    }

    private final UsuarioRepository usuarioRepository;
}