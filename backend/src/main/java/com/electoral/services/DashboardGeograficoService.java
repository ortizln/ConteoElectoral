package com.electoral.services;

import com.electoral.dto.DatoGeograficoDTO;
import com.electoral.dto.GeoResumenDTO;
import com.electoral.repositories.VotoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardGeograficoService {

    private final VotoRepository votoRepository;

    public GeoResumenDTO getResumenProvincias(Long eleccionId, Long candidatoId) {
        List<Object[]> rows = candidatoId != null
                ? votoRepository.sumVotosByProvincia(candidatoId, eleccionId)
                : votoRepository.sumVotosByProvinciaAll(eleccionId);
        long totalVotos = rows.stream().mapToLong(r -> ((Number) r[2]).longValue()).sum();
        List<DatoGeograficoDTO> items = rows.stream().map(r -> {
            Long id = ((Number) r[0]).longValue();
            String nombre = (String) r[1];
            Long votos = ((Number) r[2]).longValue();
            double pct = totalVotos > 0 ? Math.round(votos * 10000.0 / totalVotos) / 100.0 : 0;
            return DatoGeograficoDTO.builder().id(id).nombre(nombre).totalVotos(votos).porcentaje(pct).build();
        }).collect(Collectors.toList());
        return GeoResumenDTO.builder().totalVotos(totalVotos).items(items).build();
    }

    public List<DatoGeograficoDTO> getCantonesByProvincia(Long eleccionId, Long provinciaId, Long candidatoId) {
        List<Object[]> rows = candidatoId != null
                ? votoRepository.sumVotosByCantonPorCandidatoYProvincia(candidatoId, eleccionId, provinciaId)
                : votoRepository.sumVotosByCantonInProvincia(eleccionId, provinciaId);
        return mapToDTO(rows);
    }

    public List<DatoGeograficoDTO> getParroquiasByCanton(Long eleccionId, Long cantonId, Long candidatoId) {
        List<Object[]> rows = candidatoId != null
                ? votoRepository.sumVotosByParroquiaPorCandidatoYCanton(candidatoId, eleccionId, cantonId)
                : votoRepository.sumVotosByParroquiaInCanton(eleccionId, cantonId);
        return mapToDTO(rows);
    }

    private List<DatoGeograficoDTO> mapToDTO(List<Object[]> rows) {
        return rows.stream().map(r -> DatoGeograficoDTO.builder()
                .id(((Number) r[0]).longValue())
                .nombre((String) r[1])
                .totalVotos(((Number) r[2]).longValue())
                .build()).collect(Collectors.toList());
    }
}
