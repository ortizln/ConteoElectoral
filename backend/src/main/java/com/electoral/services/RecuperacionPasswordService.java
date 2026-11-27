package com.electoral.services;

import com.electoral.dto.RecuperarPasswordRequest;
import com.electoral.dto.RecuperarPasswordResponse;
import com.electoral.entities.Usuario;
import com.electoral.exception.ValidacionException;
import com.electoral.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Objects;

/** Recuperación de contraseña validando usuario + cédula y enviando una clave temporal al celular indicado. */
@Slf4j
@Service
@RequiredArgsConstructor
public class RecuperacionPasswordService {
    private static final String MAYUSCULAS = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    private static final String DIGITOS = "23456789";
    private static final String ALFABETO = MAYUSCULAS + "abcdefghijkmnopqrstuvwxyz" + DIGITOS;
    private static final SecureRandom RANDOM = new SecureRandom();

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final OpenWaService openWaService;

    @Transactional
    public RecuperarPasswordResponse recuperar(RecuperarPasswordRequest request) {
        String username = request.getUsername() == null ? "" : request.getUsername().trim();
        String identificacion = UsuarioService.normalizarIdentificacion(request.getIdentificacion());
        String celular = OpenWaService.normalizarNumeroWhatsapp(request.getCelular());

        Usuario usuario = usuarioRepository.findByUsername(username).orElse(null);
        // El celular NO se valida contra la BD: muchos usuarios no lo tienen
        // registrado. Se usa solo como destino del mensaje y se guarda después.
        boolean datosValidos = usuario != null
                && Boolean.TRUE.equals(usuario.getActivo())
                && Objects.equals(usuario.getIdentificacion(), identificacion)
                && !celular.isEmpty();

        if (!datosValidos) {
            // Mensaje genérico para no revelar si el usuario existe.
            throw new ValidacionException("Los datos ingresados no coinciden con ningún usuario registrado.");
        }

        String passwordTemporal = generarPasswordTemporal();
        String mensaje = "Estimado/a usuario/a:\n\n"
                + "Saludos de parte de ALANTEK. Se ha solicitado la recuperación de su contraseña "
                + "en el Sistema de Conteo Electoral.\n\n"
                + "Usuario: " + usuario.getUsername() + "\n"
                + "Contraseña temporal: " + passwordTemporal + "\n\n"
                + "ADVERTENCIA: Esta contraseña es temporal y de uso personal. No la comparta con "
                + "terceros y cámbiela en su primer ingreso. Si usted no solicitó este mensaje, "
                + "ignórelo y comuníquese con el administrador del sistema.";

        // Enviar primero: si WhatsApp falla, no se cambia la contraseña y el
        // usuario no recibe una clave que ya no existe por el rollback.
        openWaService.sendText(celular, mensaje);

        usuario.setPassword(passwordEncoder.encode(passwordTemporal));
        usuario.setCelular(celular);
        usuarioRepository.save(usuario);
        log.info("Contraseña temporal generada y enviada por WhatsApp al usuario {} (destino {})",
                usuario.getUsername(), OpenWaService.enmascarar(celular));

        return RecuperarPasswordResponse.builder()
                .mensaje("Contraseña temporal enviada por WhatsApp. Revise su mensaje para ingresar.")
                .username(usuario.getUsername())
                .enviadoA(OpenWaService.enmascarar(celular))
                .build();
    }

    private String generarPasswordTemporal() {
        StringBuilder sb = new StringBuilder(12);
        sb.append(MAYUSCULAS.charAt(RANDOM.nextInt(MAYUSCULAS.length())));
        sb.append(DIGITOS.charAt(RANDOM.nextInt(DIGITOS.length())));
        for (int i = 0; i < 10; i++) {
            sb.append(ALFABETO.charAt(RANDOM.nextInt(ALFABETO.length())));
        }
        return sb.toString();
    }
}
