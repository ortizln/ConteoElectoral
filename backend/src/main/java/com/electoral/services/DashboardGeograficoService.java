package com.electoral.services;

import com.electoral.dto.DatoGeograficoDTO;
import com.electoral.dto.GeoResumenDTO;
import com.electoral.dto.RecintoGeoDTO;
import com.electoral.entities.InstitucionEducativa;
import com.electoral.repositories.InstitucionEducativaRepository;
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
    private final InstitucionEducativaRepository institucionRepository;

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

    /**
     * Devuelve recintos con coordenadas y votos para pintar en el mapa.
     * Filtros opcionales: provinciaId, cantonId, parroquiaId, candidatoId.
     * Solo incluye instituciones que tengan latitud y longitud registradas.
     */
    public List<RecintoGeoDTO> getRecintosConVotos(
            Long eleccionId,
            Long candidatoId,
            Long provinciaId,
            Long cantonId,
            Long parroquiaId) {

        // 1. Votos por institución
        Map<Long, Long> votosMap = new HashMap<>();
        long totalVotos = 0;
        List<Object[]> votosRows = candidatoId != null
                ? votoRepository.sumVotosByInstitucion(candidatoId, eleccionId)
                : votoRepository.sumVotosByInstitucionAll(eleccionId);
        for (Object[] r : votosRows) {
            Long instId = ((Number) r[0]).longValue();
            Long votos = ((Number) r[1]).longValue();
            votosMap.put(instId, votos);
            totalVotos += votos;
        }

        // 2. Instituciones con coordenadas
        List<InstitucionEducativa> todas = institucionRepository.findAll();
        List<RecintoGeoDTO> resultado = new ArrayList<>();

        for (InstitucionEducativa inst : todas) {
            if (inst.getLatitud() == null || inst.getLongitud() == null) continue;

            // Filtros geográficos
            if (parroquiaId != null) {
                if (inst.getParroquia() == null || !inst.getParroquia().getId().equals(parroquiaId)) continue;
            } else if (cantonId != null) {
                if (inst.getParroquia() == null || inst.getParroquia().getCanton() == null
                        || !inst.getParroquia().getCanton().getId().equals(cantonId)) continue;
            } else if (provinciaId != null) {
                if (inst.getParroquia() == null || inst.getParroquia().getCanton() == null
                        || inst.getParroquia().getCanton().getProvincia() == null
                        || !inst.getParroquia().getCanton().getProvincia().getId().equals(provinciaId)) continue;
            }

            Long votos = votosMap.getOrDefault(inst.getId(), 0L);
            double pct = totalVotos > 0 ? Math.round(votos * 10000.0 / totalVotos) / 100.0 : 0;

            RecintoGeoDTO dto = RecintoGeoDTO.builder()
                    .id(inst.getId())
                    .nombre(inst.getNombre())
                    .latitud(inst.getLatitud())
                    .longitud(inst.getLongitud())
                    .totalVotos(votos)
                    .porcentaje(pct)
                    .totalMesas(1) // aproximación; se puede refinar si es necesario
                    .build();

            if (inst.getParroquia() != null) {
                dto.setParroquiaId(inst.getParroquia().getId());
                dto.setParroquiaNombre(inst.getParroquia().getNombre());
                if (inst.getParroquia().getCanton() != null) {
                    dto.setCantonId(inst.getParroquia().getCanton().getId());
                    dto.setCantonNombre(inst.getParroquia().getCanton().getNombre());
                    if (inst.getParroquia().getCanton().getProvincia() != null) {
                        dto.setProvinciaId(inst.getParroquia().getCanton().getProvincia().getId());
                        dto.setProvinciaNombre(inst.getParroquia().getCanton().getProvincia().getNombre());
                    }
                }
            }

            resultado.add(dto);
        }

        return resultado;
    }

    private List<DatoGeograficoDTO> mapToDTO(List<Object[]> rows) {
        return rows.stream().map(r -> DatoGeograficoDTO.builder()
                .id(((Number) r[0]).longValue())
                .nombre((String) r[1])
                .totalVotos(((Number) r[2]).longValue())
                .build()).collect(Collectors.toList());
    }
}
