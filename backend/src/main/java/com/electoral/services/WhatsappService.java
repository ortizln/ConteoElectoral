package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.exception.ValidacionException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/** Configuracion de grupos y bandeja de envio de fotos del acta por WhatsApp. */
@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class WhatsappService {
    private final WhatsappConfigRepository configRepository;
    private final WhatsappGrupoRepository grupoRepository;
    private final WhatsappEnvioRepository envioRepository;
    private final MesaRepository mesaRepository;
    private final MesaActaFotoRepository fotoRepository;
    private final OpenWaService openWaService;

    private WhatsappConfig configuracion() {
        return configRepository.findById(1L).orElseGet(() ->
                configRepository.save(WhatsappConfig.builder().id(1L).activo(true).build()));
    }

    private String sessionIdEfectivo(WhatsappConfig config) {
        if (config.getSessionId() != null && !config.getSessionId().isBlank()) {
            return config.getSessionId().trim();
        }
        return openWaService.getSessionIdConfigurado();
    }

    public WhatsappEstadoResponse estado() {
        WhatsappConfig config = configuracion();
        String sessionId = sessionIdEfectivo(config);
        WhatsappEstadoResponse.WhatsappEstadoResponseBuilder builder = WhatsappEstadoResponse.builder()
                .sessionId(sessionId)
                .activo(Boolean.TRUE.equals(config.getActivo()))
                .apiKeyConfigured(openWaService.isApiKeyConfigured());

        try {
            Optional<OpenWaService.Sesion> sesion = openWaService.listarSesiones().stream()
                    .filter(s -> sessionId != null && sessionId.equals(s.getId()))
                    .findFirst();
            if (sesion.isPresent()) {
                OpenWaService.Sesion s = sesion.get();
                builder.nombreSesion(s.getNombre())
                        .status(s.getStatus())
                        .phone(s.getPhone())
                        .ready("ready".equalsIgnoreCase(s.getStatus()));
                builder.mensaje("ready".equalsIgnoreCase(s.getStatus())
                        ? "WhatsApp vinculado y listo"
                        : "La sesion existe pero no esta lista (estado: " + s.getStatus() + ")");
            } else {
                builder.status("NO_ENCONTRADA")
                        .ready(false)
                        .mensaje("No se encontro la sesion en OpenWA");
            }
        } catch (Exception e) {
            builder.status("ERROR")
                    .ready(false)
                    .mensaje("No se pudo consultar OpenWA: " + e.getMessage());
        }
        return builder.build();
    }

    @Transactional
    public WhatsappEstadoResponse actualizarConfig(WhatsappConfigRequest request) {
        WhatsappConfig config = configuracion();
        if (request.getSessionId() != null && !request.getSessionId().isBlank()) {
            config.setSessionId(request.getSessionId().trim());
        } else if (request.getSessionId() != null) {
            config.setSessionId(null);
        }
        if (request.getActivo() != null) config.setActivo(request.getActivo());
        configRepository.save(config);
        return estado();
    }

    public List<WhatsappGrupoResponse> listarGrupos() {
        List<OpenWaService.Grupo> remotos;
        try {
            remotos = openWaService.listarGrupos(sessionIdEfectivo(configuracion()));
        } catch (Exception e) {
            log.warn("No se pudieron listar los grupos de OpenWA: {}", e.getMessage());
            remotos = List.of();
        }

        Map<String, WhatsappGrupo> guardados = grupoRepository.findAllByOrderByNombreAsc().stream()
                .collect(Collectors.toMap(WhatsappGrupo::getChatId, g -> g, (a, b) -> a, LinkedHashMap::new));
        List<WhatsappGrupoResponse> respuesta = new ArrayList<>();
        Set<String> vistos = new HashSet<>();

        for (OpenWaService.Grupo g : remotos) {
            WhatsappGrupo cfg = guardados.get(g.getId());
            respuesta.add(WhatsappGrupoResponse.builder()
                    .chatId(g.getId())
                    .nombre(cfg != null && cfg.getNombre() != null ? cfg.getNombre() : g.getNombre())
                    .id(cfg != null ? cfg.getId() : null)
                    .activo(cfg != null && Boolean.TRUE.equals(cfg.getActivo()))
                    .configurado(cfg != null)
                    .esGrupo(g.isEsGrupo())
                    .build());
            vistos.add(g.getId());
        }
        // Grupos guardados que ya no aparecen en OpenWA siguen visibles para poder desactivarlos.
        for (WhatsappGrupo cfg : guardados.values()) {
            if (!vistos.contains(cfg.getChatId())) {
                respuesta.add(WhatsappGrupoResponse.builder()
                        .id(cfg.getId())
                        .chatId(cfg.getChatId())
                        .nombre(cfg.getNombre())
                        .activo(Boolean.TRUE.equals(cfg.getActivo()))
                        .configurado(true)
                        .esGrupo(cfg.getChatId().endsWith("@g.us"))
                        .build());
            }
        }
        return respuesta;
    }

    @Transactional
    public WhatsappGrupoResponse guardarGrupo(WhatsappGrupoRequest request) {
        String chatId = request.getChatId() == null ? "" : request.getChatId().trim();
        if (chatId.isBlank()) throw new ValidacionException("El chatId del grupo es requerido");
        String nombre = request.getNombre() == null ? "" : request.getNombre().trim();
        if (nombre.isBlank()) throw new ValidacionException("El nombre del grupo es requerido");

        WhatsappGrupo grupo = grupoRepository.findByChatId(chatId).orElseGet(() ->
                WhatsappGrupo.builder().chatId(chatId).nombre(nombre).activo(true).build());
        grupo.setNombre(nombre);
        if (request.getActivo() != null) grupo.setActivo(request.getActivo());
        return toGrupoResponse(grupoRepository.save(grupo));
    }

    @Transactional
    public WhatsappGrupoResponse actualizarGrupo(Long id, WhatsappGrupoRequest request) {
        WhatsappGrupo grupo = grupoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Grupo de WhatsApp no encontrado: " + id));
        if (request.getNombre() != null && !request.getNombre().isBlank()) {
            grupo.setNombre(request.getNombre().trim());
        }
        if (request.getActivo() != null) grupo.setActivo(request.getActivo());
        return toGrupoResponse(grupoRepository.save(grupo));
    }

    @Transactional
    public void eliminarGrupo(Long id) {
        WhatsappGrupo grupo = grupoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Grupo de WhatsApp no encontrado: " + id));
        grupoRepository.delete(grupo);
    }

    public List<WhatsappEnvioResponse> listarEnvios() {
        return envioRepository.findTop100ByOrderByIdDesc().stream().map(this::toEnvioResponse)
                .collect(Collectors.toList());
    }

    /**
     * Se invoca justo despues de guardar una foto del acta. Crea un registro por
     * grupo activo (caja de envios) e intenta la entrega; un fallo de OpenWA no
     * debe impedir que el miembro de mesa suba el acta.
     */
    @Transactional
    public void notificarNuevaFoto(MesaActaFoto foto) {
        WhatsappConfig config = configuracion();
        if (!Boolean.TRUE.equals(config.getActivo())) return;

        List<WhatsappGrupo> grupos = grupoRepository.findByActivoTrueOrderByNombreAsc();
        if (grupos.isEmpty()) return;
        if (foto == null || foto.getId() == null) return;

        // Recargar dentro de esta transacción: mesa y subidoPor son LAZY.
        MesaActaFoto fotoCompleta = fotoRepository.findById(foto.getId()).orElse(null);
        if (fotoCompleta == null || fotoCompleta.getMesa() == null) return;
        Mesa mesa = mesaRepository.findById(fotoCompleta.getMesa().getId()).orElse(null);
        if (mesa == null) return;
        String caption = construirCaption(mesa, fotoCompleta.getSubidoPor());
        String sessionId = sessionIdEfectivo(config);
        String mimetype = fotoCompleta.getContentType() != null ? fotoCompleta.getContentType() : "image/jpeg";

        for (WhatsappGrupo grupo : grupos) {
            if (envioRepository.findByFotoIdAndGrupoId(foto.getId(), grupo.getId()).isPresent()) continue;
            WhatsappEnvio envio = WhatsappEnvio.builder()
                    .fotoId(foto.getId())
                    .mesaId(mesa.getId())
                    .grupoId(grupo.getId())
                    .estado("PENDIENTE")
                    .intentos(0)
                    .build();
            envio = envioRepository.save(envio);
            entregar(envio, fotoCompleta.getFoto(), mimetype, caption, sessionId);
        }
    }

    @Transactional
    public WhatsappEnvioResponse reenviar(Long envioId) {
        WhatsappEnvio envio = envioRepository.findById(envioId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Envio no encontrado: " + envioId));
        MesaActaFoto foto = fotoRepository.findById(envio.getFotoId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Foto no encontrada: " + envio.getFotoId()));
        Mesa mesa = mesaRepository.findById(envio.getMesaId()).orElse(null);
        WhatsappGrupo grupo = grupoRepository.findById(envio.getGrupoId()).orElse(null);
        if (mesa == null || grupo == null) {
            throw new ValidacionException("No se puede reenviar: la mesa o el grupo ya no existen");
        }
        String caption = construirCaption(mesa, foto.getSubidoPor());
        String mimetype = foto.getContentType() != null ? foto.getContentType() : "image/jpeg";
        entregar(envio, foto.getFoto(), mimetype, caption, sessionIdEfectivo(configuracion()));
        return toEnvioResponse(envio);
    }

    private void entregar(WhatsappEnvio envio, byte[] bytes, String mimetype,
                          String caption, String sessionId) {
        envio.setIntentos((envio.getIntentos() == null ? 0 : envio.getIntentos()) + 1);
        try {
            Map<String, Object> respuesta = openWaService.sendImage(
                    sessionId, grupoRepository.findById(envio.getGrupoId())
                            .orElseThrow(() -> new RecursoNoEncontradoException("Grupo no encontrado"))
                            .getChatId(),
                    bytes, mimetype, caption);
            envio.setEstado("ENVIADO");
            envio.setMessageId(respuesta.get("messageId") != null ? String.valueOf(respuesta.get("messageId")) : null);
            envio.setError(null);
            envio.setEnviadoAt(LocalDateTime.now());
        } catch (Exception e) {
            envio.setEstado("FALLIDO");
            String error = e.getMessage() == null ? e.getClass().getSimpleName() : e.getMessage();
            envio.setError(error.length() > 500 ? error.substring(0, 500) : error);
            log.warn("Fallo envio de foto de la mesa {} al grupo {}: {}",
                    envio.getMesaId(), envio.getGrupoId(), error);
        }
        envioRepository.save(envio);
    }

    /** Caption ASCII puro: evita la recodificacion Windows-1252 del gateway OpenWA. */
    private String construirCaption(Mesa mesa, Usuario usuario) {
        InstitucionEducativa institucion = mesa.getInstitucion();
        String recinto = ascii(institucion != null ? institucion.getNombre() : "SIN RECINTO");
        String numero = ascii(mesa.getNumero());
        String sexo = mesa.getSexo() != null ? mesa.getSexo().name() : "";
        String usuarioNombre = usuario != null
                ? ascii(usuario.getNombre() + " " + usuario.getApellido())
                : "SIN USUARIO";
        String estadoCaja = Boolean.TRUE.equals(mesa.getCerrada()) ? "CERRADA" : "ABIERTA";
        if (Boolean.TRUE.equals(mesa.getAprobada())) estadoCaja += " / APROBADA";
        else estadoCaja += " / NO APROBADA";

        String caption = "FOTO ACTA - Recinto: " + recinto
                + " | Mesa: " + numero + (sexo.isEmpty() ? "" : " (" + sexo + ")")
                + " | Usuario: " + usuarioNombre
                + " | Estado caja: " + estadoCaja;
        return caption.length() > 900 ? caption.substring(0, 900) : caption;
    }

    private String ascii(String valor) {
        if (valor == null) return "";
        String limpio = Normalizer.normalize(valor, Normalizer.Form.NFKD).replaceAll("\\p{M}+", "");
        limpio = limpio.replaceAll("[^\\x20-\\x7E]", " ").replaceAll("\\s+", " ").trim();
        return limpio.isEmpty() ? "SIN DATO" : limpio;
    }

    private WhatsappGrupoResponse toGrupoResponse(WhatsappGrupo grupo) {
        return WhatsappGrupoResponse.builder()
                .id(grupo.getId())
                .chatId(grupo.getChatId())
                .nombre(grupo.getNombre())
                .activo(Boolean.TRUE.equals(grupo.getActivo()))
                .configurado(true)
                .esGrupo(grupo.getChatId() != null && grupo.getChatId().endsWith("@g.us"))
                .build();
    }

    private WhatsappEnvioResponse toEnvioResponse(WhatsappEnvio envio) {
        String mesaNumero = mesaRepository.findById(envio.getMesaId())
                .map(Mesa::getNumero).orElse(null);
        String grupoNombre = grupoRepository.findById(envio.getGrupoId())
                .map(WhatsappGrupo::getNombre).orElse(null);
        return WhatsappEnvioResponse.builder()
                .id(envio.getId())
                .fotoId(envio.getFotoId())
                .mesaId(envio.getMesaId())
                .mesaNumero(mesaNumero)
                .grupoId(envio.getGrupoId())
                .grupoNombre(grupoNombre)
                .estado(envio.getEstado())
                .messageId(envio.getMessageId())
                .error(envio.getError())
                .intentos(envio.getIntentos())
                .createdAt(envio.getCreatedAt())
                .enviadoAt(envio.getEnviadoAt())
                .build();
    }
}
