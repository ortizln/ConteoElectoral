package com.electoral.services;

import com.electoral.dto.ApkVersionResponse;
import com.electoral.entities.ApkVersion;
import com.electoral.repositories.ApkVersionRepository;
import com.electoral.repositories.ApkVersionRepository.ApkVersionMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApkVersionService {
    private final ApkVersionRepository repository;

    @Transactional(readOnly = true)
    public List<ApkVersionResponse> listAll() {
        return repository.findAllByOrderByFechaSubidaDesc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApkVersionResponse upload(String version, String nombreArchivo, byte[] data) {
        ApkVersion apk = ApkVersion.builder()
                .version(version)
                .nombreArchivo(nombreArchivo)
                .data(data)
                .build();
        ApkVersion saved = repository.save(apk);
        return ApkVersionResponse.builder()
                .id(saved.getId())
                .version(saved.getVersion())
                .nombreArchivo(saved.getNombreArchivo())
                .fechaSubida(saved.getFechaSubida() != null ? saved.getFechaSubida().toString() : null)
                .build();
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Versión APK no encontrada: " + id);
        }
        repository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public byte[] getData(Long id) {
        ApkVersion apk = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Versión APK no encontrada: " + id));
        return apk.getData();
    }

    @Transactional(readOnly = true)
    public Map<String, String> getLatestVersionInfo() {
        return repository.findFirstByOrderByFechaSubidaDesc()
                .map(apk -> Map.of(
                        "version", apk.getVersion(),
                        "apkNombre", apk.getNombreArchivo()
                ))
                .orElse(null);
    }

    @Transactional(readOnly = true)
    public byte[] getLatestData() {
        return repository.findTopByOrderByFechaSubidaDesc()
                .map(ApkVersion::getData)
                .orElse(null);
    }

    @Transactional(readOnly = true)
    public String getLatestNombre() {
        return repository.findFirstByOrderByFechaSubidaDesc()
                .map(ApkVersionMetadata::getNombreArchivo)
                .orElse(null);
    }

    private ApkVersionResponse toResponse(ApkVersionMetadata apk) {
        return ApkVersionResponse.builder()
                .id(apk.getId())
                .version(apk.getVersion())
                .nombreArchivo(apk.getNombreArchivo())
                .fechaSubida(apk.getFechaSubida() != null ? apk.getFechaSubida().toString() : null)
                .build();
    }
}
