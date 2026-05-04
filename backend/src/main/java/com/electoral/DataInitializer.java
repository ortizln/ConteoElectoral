package com.electoral;

import com.electoral.entities.Rol;
import com.electoral.entities.Usuario;
import com.electoral.repositories.RolRepository;
import com.electoral.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    private final RolRepository rolRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @SuppressWarnings("null")
    public void run(String... args) {
        log.info("=== INICIANDO DATAINITIALIZER ===");
        
        // Crear roles
        if (rolRepository.count() == 0) {
            Rol adminRol = Rol.builder().nombre("ADMIN").descripcion("Administrador del sistema").build();
            Rol supervisorRol = Rol.builder().nombre("SUPERVISOR").descripcion("Supervisor de elecciones").build();
            Rol miembroRol = Rol.builder().nombre("MIEMBRO_MESA").descripcion("Miembro de mesa de votación").build();
            rolRepository.save(adminRol);
            rolRepository.save(supervisorRol);
            rolRepository.save(miembroRol);
            log.info("Roles inicializados");
        }

        // Crear usuario admin
        if (!usuarioRepository.existsByUsername("admin")) {
            Rol adminRol = rolRepository.findByNombre("ADMIN").orElseThrow();
            usuarioRepository.save(Usuario.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .nombre("Administrador")
                    .apellido("Sistema")
                    .email("admin@electoral.gob")
                    .rol(adminRol)
                    .activo(true)
                    .build());
            log.info("Usuario admin creado con password: admin123");
        } else {
            // Actualizar password por si acaso
            usuarioRepository.findByUsername("admin").ifPresent(usuario -> {
                usuario.setPassword(passwordEncoder.encode("admin123"));
                usuarioRepository.save(usuario);
                log.info("Password de admin reseteado a: admin123");
            });
        }
        
        log.info("=== DATAINITIALIZER COMPLETADO ===");
    }
}