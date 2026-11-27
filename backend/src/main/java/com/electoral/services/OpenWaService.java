package com.electoral.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;

/**
 * Cliente mínimo del gateway OpenWA. Envía mensajes de texto a través de una
 * sesión de WhatsApp ya vinculada.
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

    public void sendText(String celular, String text) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("OpenWA no está configurado: falta la API key");
        }
        if (sessionId == null || sessionId.isBlank()) {
            throw new IllegalStateException("OpenWA no está configurado: falta el ID de sesión");
        }

        String url = baseUrl.replaceAll("/+$", "")
                + "/api/sessions/" + sessionId + "/messages/send-text";
        String chatId = celular + "@c.us";

        try {
            String body = objectMapper.writeValueAsString(Map.of("chatId", chatId, "text", text));
            HttpRequest request = HttpRequest.newBuilder(URI.create(url))
                    .timeout(Duration.ofSeconds(30))
                    .header("X-API-Key", apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            // OpenWA (Nest/Fastify) cierra la conexión si Java propone el upgrade
            // h2c que HttpClient hace por defecto. Forzamos HTTP/1.1.
            HttpClient client = HttpClient.newBuilder()
                    .version(HttpClient.Version.HTTP_1_1)
                    .connectTimeout(Duration.ofSeconds(10))
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                log.error("OpenWA rechazó el envío a {}: {} {}", chatId, response.statusCode(), response.body());
                throw new IllegalStateException("No se pudo enviar el mensaje por WhatsApp (HTTP "
                        + response.statusCode() + ")");
            }
            log.info("Mensaje de WhatsApp enviado a {}", enmascarar(celular));
        } catch (IllegalStateException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error al enviar mensaje por WhatsApp a {}: {}", enmascarar(celular), e.getMessage());
            throw new IllegalStateException("No se pudo conectar con OpenWA: " + e.getMessage(), e);
        }
    }

    public static String enmascarar(String celular) {
        if (celular == null || celular.length() < 6) {
            return celular == null ? "-" : "***";
        }
        return celular.substring(0, 3) + "****" + celular.substring(celular.length() - 2);
    }
}
