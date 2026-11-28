package com.electoral.services;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Cliente del gateway OpenWA. Maneja sesiones, grupos y envio de texto/imagen.
 *
 * Nota UTF-8: OpenWA recodifica el cuerpo como Windows-1252 cuando recibe
 * caracteres no ASCII aunque se indique charset=UTF-8. Por eso todos los JSON
 * que enviamos se serializan con escapes Unicode (solo ASCII en la red).
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class OpenWaService {
    private final ObjectMapper objectMapper;

    @Value("${openwa.base-url}")
    private String baseUrl;

    @Value("${openwa.api-key}")
    private String apiKey;

    @Value("${openwa.session-id}")
    private String sessionId;

    @Value("${openwa.sender-number:}")
    private String senderNumber;

    /** Envia un mensaje de texto a un numero (usado por recuperacion de password). */
    public void sendText(String celular, String text) {
        String numero = normalizarNumeroWhatsapp(celular);
        String chatId = numero + "@c.us";
        Map<String, Object> body = new HashMap<>();
        body.put("chatId", chatId);
        body.put("text", text == null ? "" : text);
        postJson(this.sessionId, "/messages/send-text", body);
        log.info("Mensaje de WhatsApp enviado a {}", enmascarar(numero));
    }

    /** Lista las sesiones disponibles en el gateway. */
    public List<Sesion> listarSesiones() {
        JsonNode root = getJsonDirect("/sessions");
        JsonNode arr = root.isArray() ? root : root.path("sessions");
        List<Sesion> sesiones = new ArrayList<>();
        if (arr.isArray()) {
            for (JsonNode n : arr) {
                sesiones.add(Sesion.builder()
                        .id(texto(n, "id"))
                        .nombre(texto(n, "name"))
                        .status(texto(n, "status"))
                        .phone(texto(n, "phone"))
                        .build());
            }
        }
        return sesiones;
    }

    /** Lista los grupos de la sesion indicada (o de la sesion por defecto). */
    public List<Grupo> listarGrupos(String sesion) {
        JsonNode root = getJson(sesion, "/groups");
        JsonNode arr = root.isArray() ? root : root.path("groups");
        List<Grupo> grupos = new ArrayList<>();
        if (arr.isArray()) {
            for (JsonNode n : arr) {
                String id = texto(n, "id");
                if (id == null || id.isBlank()) continue;
                grupos.add(Grupo.builder()
                        .id(id)
                        .nombre(texto(n, "name"))
                        .linkedParentJID(texto(n, "linkedParentJID"))
                        .esGrupo(id.endsWith("@g.us"))
                        .build());
            }
        }
        return grupos;
    }

    /** Envia una imagen a un chat/grupo con caption y devuelve el.messageId. */
    public Map<String, Object> sendImage(String sesion, String chatId, byte[] bytes,
                                         String mimetype, String caption) {
        if (bytes == null || bytes.length == 0) {
            throw new IllegalStateException("No hay imagen para enviar por WhatsApp");
        }
        Map<String, Object> body = new HashMap<>();
        body.put("chatId", chatId);
        body.put("base64", java.util.Base64.getEncoder().encodeToString(bytes));
        body.put("mimetype", mimetype == null || mimetype.isBlank() ? "image/jpeg" : mimetype);
        body.put("caption", caption == null ? "" : caption);
        JsonNode respuesta = postJson(sesion, "/messages/send-image", body);
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("messageId", texto(respuesta, "messageId"));
        resultado.put("timestamp", respuesta.hasNonNull("timestamp") ? respuesta.get("timestamp").asLong() : null);
        return resultado;
    }

    private JsonNode getJson(String sesion, String path) {
        validarConfiguracion(sesion);
        return request(sesionEfectiva(sesion) + path, HttpMethod.GET, null);
    }

    private JsonNode getJsonDirect(String path) {
        validarApiKey();
        String url = baseUrl.replaceAll("/+$", "") + "/api" + path;
        return request(url, HttpMethod.GET, null);
    }

    private JsonNode postJson(String sesion, String path, Object body) {
        validarConfiguracion(sesion);
        String url = sesionEfectiva(sesion) + path;
        return request(url, HttpMethod.POST, body);
    }

    private String sesionEfectiva(String sesion) {
        String id = sesion != null && !sesion.isBlank() ? sesion : this.sessionId;
        return baseUrl.replaceAll("/+$", "") + "/api/sessions/" + id;
    }

    private JsonNode request(String url, HttpMethod method, Object body) {
        try {
            HttpRequest.Builder builder = HttpRequest.newBuilder(URI.create(url))
                    .timeout(Duration.ofSeconds(20))
                    .header("X-API-Key", apiKey)
                    .header("Accept", "application/json");

            byte[] payload = null;
            if (method == HttpMethod.POST) {
                // ESCAPE_NON_ASCII garantiza que la red reciba solo ASCII.
                ObjectMapper asciiMapper = objectMapper.copy().enable(JsonGenerator.Feature.ESCAPE_NON_ASCII);
                payload = asciiMapper.writeValueAsBytes(body);
                builder.header("Content-Type", "application/json; charset=UTF-8")
                        .POST(HttpRequest.BodyPublishers.ofByteArray(payload));
            } else {
                builder.GET();
            }

            // OpenWA cierra la conexion si Java propone h2c; forzamos HTTP/1.1.
            HttpClient client = HttpClient.newBuilder()
                    .version(HttpClient.Version.HTTP_1_1)
                    .connectTimeout(Duration.ofSeconds(10))
                    .build();
            HttpResponse<String> response = client.send(builder.build(),
                    HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                String detalle = response.body() == null ? "" : response.body();
                if (detalle.length() > 300) detalle = detalle.substring(0, 300);
                log.error("OpenWA rechazo {}: {} {}", url, response.statusCode(), detalle);
                throw new IllegalStateException("No se pudo comunicar con WhatsApp (HTTP "
                        + response.statusCode() + ")");
            }
            String respuesta = response.body();
            if (respuesta == null || respuesta.isBlank()) return objectMapper.createObjectNode();
            return objectMapper.readTree(respuesta);
        } catch (IllegalStateException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error al comunicarse con OpenWA ({}): {}", url, e.getMessage());
            throw new IllegalStateException("No se pudo conectar con OpenWA: " + e.getMessage(), e);
        }
    }

    private void validarConfiguracion(String sesion) {
        validarApiKey();
        String id = sesion != null && !sesion.isBlank() ? sesion : this.sessionId;
        if (id == null || id.isBlank()) {
            throw new IllegalStateException("OpenWA no esta configurado: falta el ID de sesion");
        }
    }

    private void validarApiKey() {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("OpenWA no esta configurado: falta la API key");
        }
    }

    private static String texto(JsonNode n, String campo) {
        JsonNode v = n == null ? null : n.get(campo);
        return v == null || v.isNull() ? null : v.asText();
    }

    public String getSenderNumber() {
        return senderNumber;
    }

    public boolean isApiKeyConfigured() {
        return apiKey != null && !apiKey.isBlank();
    }

    public String getSessionIdConfigurado() {
        return sessionId;
    }

    /** 0987269948 -> 593987269948, 987269948 -> 593987269948. */
    public static String normalizarNumeroWhatsapp(String celular) {
        if (celular == null) return "";
        String digitos = celular.replaceAll("\\D", "");
        if (digitos.startsWith("0") && digitos.length() >= 10) {
            return "593" + digitos.substring(1);
        }
        if (digitos.length() == 9) return "593" + digitos;
        return digitos;
    }

    public static String enmascarar(String celular) {
        if (celular == null || celular.length() < 6) {
            return celular == null ? "-" : "***";
        }
        return celular.substring(0, 3) + "****" + celular.substring(celular.length() - 2);
    }

    private enum HttpMethod { GET, POST }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Sesion {
        private String id;
        private String nombre;
        private String status;
        private String phone;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Grupo {
        private String id;
        private String nombre;
        private String linkedParentJID;
        private boolean esGrupo;
    }
}
