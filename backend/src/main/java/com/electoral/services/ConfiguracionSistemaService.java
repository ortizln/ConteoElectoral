package com.electoral.services;

import com.electoral.dto.ConfiguracionRequest;
import com.electoral.dto.ConfiguracionResponse;
import com.electoral.entities.ConfiguracionSistema;
import com.electoral.repositories.ConfiguracionSistemaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ConfiguracionSistemaService {
    private final ConfiguracionSistemaRepository repository;

    @Transactional(readOnly = true)
    public ConfiguracionResponse getConfiguracion() {
        ConfiguracionSistema config = repository.findById(1L)
                .orElseGet(() -> {
                    ConfiguracionSistema nueva = ConfiguracionSistema.builder()
                            .id(1L)
                            .nombrePartido("Mi Partido")
                            .descripcion("")
                            .build();
                    return repository.save(nueva);
                });
        return mapToResponse(config);
    }

    @Transactional(readOnly = true)
    public byte[] getLogo() {
        return repository.findById(1L)
                .map(ConfiguracionSistema::getLogo)
                .orElse(null);
    }

    @Transactional
    public ConfiguracionResponse updateConfiguracion(ConfiguracionRequest request) {
        ConfiguracionSistema config = repository.findById(1L)
                .orElseGet(() -> ConfiguracionSistema.builder().id(1L).build());

        config.setNombrePartido(request.getNombrePartido());
        config.setDescripcion(request.getDescripcion());
        repository.save(config);
        return mapToResponse(config);
    }

    @Transactional
    public ConfiguracionResponse uploadLogo(MultipartFile file) throws IOException {
        ConfiguracionSistema config = repository.findById(1L)
                .orElseGet(() -> ConfiguracionSistema.builder().id(1L).build());

        config.setLogo(file.getBytes());
        repository.save(config);
        return mapToResponse(config);
    }

    @Transactional
    public void deleteLogo() {
        ConfiguracionSistema config = repository.findById(1L)
                .orElseGet(() -> ConfiguracionSistema.builder().id(1L).build());

        config.setLogo(null);
        repository.save(config);
    }

    private ConfiguracionResponse mapToResponse(ConfiguracionSistema config) {
        return ConfiguracionResponse.builder()
                .id(config.getId())
                .nombrePartido(config.getNombrePartido())
                .descripcion(config.getDescripcion())
                .tieneLogo(config.getLogo() != null && config.getLogo().length > 0)
                .updatedAt(config.getUpdatedAt())
                .build();
    }
}
