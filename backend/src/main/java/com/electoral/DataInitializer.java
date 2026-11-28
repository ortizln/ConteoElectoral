package com.electoral;

import com.electoral.entities.Rol;
import com.electoral.entities.Usuario;
import com.electoral.repositories.RolRepository;
import com.electoral.repositories.UsuarioRepository;
import com.electoral.services.PermisoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    private static final String ADMIN_PASSWORD = "Roller@086411421";

    private final RolRepository rolRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final PermisoService permisoService;

    @Override
    @SuppressWarnings("null")
    public void run(String... args) {
        log.info("=== INICIANDO DATAINITIALIZER ===");
        
        // Crear (o recuperar) roles. Se comprueba uno por uno para que una
        // instalación existente obtenga VISITANTE sin recrear los anteriores.
        ensureRol("ADMIN", "Administrador del sistema");
        ensureRol("SUPERVISOR", "Supervisor de elecciones");
        ensureRol("MIEMBRO_MESA", "Miembro de mesa de votación");
        ensureRol("OPERADOR", "Operador de registro de votos");
        ensureRol("VISITANTE", "Visitante con acceso de solo lectura a los resultados");
        log.info("Roles inicializados");

        // Crear usuario admin
        if (!usuarioRepository.existsByUsername("admin")) {
            Rol adminRol = rolRepository.findByNombre("ADMIN").orElseThrow();
            usuarioRepository.save(Usuario.builder()
                    .username("admin")
                    .password(passwordEncoder.encode(ADMIN_PASSWORD))
                    .nombre("Administrador")
                    .apellido("Sistema")
                    .email("admin@electoral.gob")
                    .rol(adminRol)
                    .activo(true)
                    .build());
            log.info("Usuario admin creado con password: {}", ADMIN_PASSWORD);
        } else {
            // Actualizar password por si acaso
            usuarioRepository.findByUsername("admin").ifPresent(usuario -> {
                usuario.setPassword(passwordEncoder.encode(ADMIN_PASSWORD));
                usuarioRepository.save(usuario);
                log.info("Password de admin reseteado a: {}", ADMIN_PASSWORD);
            });
        }
        
        // Inicializar permisos por defecto
        permisoService.initDefaultPermisos();
        
        log.info("=== DATAINITIALIZER COMPLETADO ===");
    }

    private void ensureRol(String nombre, String descripcion) {
        if (rolRepository.findByNombre(nombre).isEmpty()) {
            rolRepository.save(Rol.builder().nombre(nombre).descripcion(descripcion).build());
        }
    }
}