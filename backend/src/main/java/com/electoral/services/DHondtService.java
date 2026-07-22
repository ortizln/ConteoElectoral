package com.electoral.services;

import com.electoral.entities.*;
import com.electoral.repositories.*;
import com.electoral.dto.ResultadoDHondtResponse;
import com.electoral.dto.ResultadoDHondtResponse.AsignacionDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DHondtService {

    private final CircunscripcionRepository circunscripcionRepository;
    private final AsignacionEscanoRepository asignacionEscanoRepository;
    private final VotoRepository votoRepository;
    private final PartidoRepository partidoRepository;
    private final ObjectMapper objectMapper;

    @Transactional
    public ResultadoDHondtResponse calcular(Long circunscripcionId) {
        Circunscripcion circ = circunscripcionRepository.findById(circunscripcionId)
                .orElseThrow(() -> new IllegalArgumentException("Circunscripción no encontrada: " + circunscripcionId));

        asignacionEscanoRepository.deleteByCircunscripcionId(circunscripcionId);

        Map<Long, Integer> votosPorPartido = obtenerVotosPorPartido(circ);
        int totalVotosValidos = votosPorPartido.values().stream().mapToInt(Integer::intValue).sum();
        double umbral = circ.getUmbralElectoral() != null ? circ.getUmbralElectoral() : 0;

        List<Map.Entry<Long, Integer>> partidosElegibles = votosPorPartido.entrySet().stream()
                .filter(e -> {
                    double porcentaje = totalVotosValidos > 0 ? (e.getValue() * 100.0 / totalVotosValidos) : 0;
                    return porcentaje >= umbral;
                })
                .sorted(Map.Entry.<Long, Integer>comparingByValue().reversed())
                .collect(Collectors.toList());

        if (partidosElegibles.isEmpty()) {
            log.warn("Ningún partido supera el umbral del {}% en circunscripción {}", umbral, circ.getNombre());
            return buildResultadoVacio(circ);
        }

        List<DHondtEntry> cocientes = new ArrayList<>();
        for (Map.Entry<Long, Integer> entry : partidosElegibles) {
            for (int divisor = 1; divisor <= circ.getEscanos(); divisor++) {
                cocientes.add(new DHondtEntry(entry.getKey(), entry.getValue(), divisor));
            }
        }

        cocientes.sort((a, b) -> Double.compare(b.cociente, a.cociente));

        Map<Long, Integer> escanosAsignados = new HashMap<>();
        for (int i = 0; i < circ.getEscanos() && i < cocientes.size(); i++) {
            Long partidoId = cocientes.get(i).partidoId;
            escanosAsignados.merge(partidoId, 1, Integer::sum);
        }

        List<AsignacionDto> asignaciones = new ArrayList<>();
        for (Map.Entry<Long, Integer> entry : partidosElegibles) {
            Long partidoId = entry.getKey();
            int votos = entry.getValue();
            int escanos = escanosAsignados.getOrDefault(partidoId, 0);
            double porcentaje = totalVotosValidos > 0 ? (votos * 100.0 / totalVotosValidos) : 0;

            List<Double> cocientesPartido = cocientes.stream()
                    .filter(c -> c.partidoId.equals(partidoId))
                    .limit(escanos > 0 ? escanos : 1)
                    .map(c -> c.cociente)
                    .collect(Collectors.toList());

            Partido partido = partidoRepository.findById(partidoId).orElse(null);
            String cocientesJson = toJson(cocientesPartido);

            Partido p = partidoRepository.findById(partidoId).orElse(null);

            AsignacionEscano asignacion = AsignacionEscano.builder()
                    .circunscripcion(circ)
                    .partido(p)
                    .votosValidos(votos)
                    .porcentajeVotos(Math.round(porcentaje * 100.0) / 100.0)
                    .escanosAsignados(escanos)
                    .cocientes(cocientesJson)
                    .build();
            asignacionEscanoRepository.save(asignacion);

            asignaciones.add(AsignacionDto.builder()
                    .partidoId(partidoId)
                    .partidoNombre(p != null ? p.getNombre() : "Desconocido")
                    .partidoSigla(p != null ? p.getSigla() : null)
                    .votosValidos(votos)
                    .porcentajeVotos(Math.round(porcentaje * 100.0) / 100.0)
                    .escanosAsignados(escanos)
                    .cocientes(cocientesPartido)
                    .build());
        }

        asignaciones.sort((a, b) -> Integer.compare(b.getEscanosAsignados(), a.getEscanosAsignados()));

        return ResultadoDHondtResponse.builder()
                .circunscripcionId(circ.getId())
                .circunscripcionNombre(circ.getNombre())
                .totalEscanos(circ.getEscanos())
                .totalVotosValidos(totalVotosValidos)
                .umbralElectoral(umbral)
                .asignaciones(asignaciones)
                .build();
    }

    @Transactional(readOnly = true)
    public ResultadoDHondtResponse consultarResultado(Long circunscripcionId) {
        List<AsignacionEscano> asignaciones = asignacionEscanoRepository
                .findByCircunscripcionIdOrderByEscanosAsignadosDesc(circunscripcionId);
        if (asignaciones.isEmpty()) return null;

        Circunscripcion circ = asignaciones.get(0).getCircunscripcion();
        int totalVotos = asignaciones.stream().mapToInt(AsignacionEscano::getVotosValidos).sum();

        return ResultadoDHondtResponse.builder()
                .circunscripcionId(circ.getId())
                .circunscripcionNombre(circ.getNombre())
                .totalEscanos(circ.getEscanos())
                .totalVotosValidos(totalVotos)
                .umbralElectoral(circ.getUmbralElectoral())
                .asignaciones(asignaciones.stream().map(a -> {
                    List<Double> cocientes = parseCocientes(a.getCocientes());
                    return AsignacionDto.builder()
                            .partidoId(a.getPartido().getId())
                            .partidoNombre(a.getPartido().getNombre())
                            .partidoSigla(a.getPartido().getSigla())
                            .votosValidos(a.getVotosValidos())
                            .porcentajeVotos(a.getPorcentajeVotos())
                            .escanosAsignados(a.getEscanosAsignados())
                            .cocientes(cocientes)
                            .build();
                }).collect(Collectors.toList()))
                .build();
    }

    private Map<Long, Integer> obtenerVotosPorPartido(Circunscripcion circ) {
        List<Object[]> resultados;
        if (circ.getTipoCircunscripcion() != null) {
            resultados = votoRepository.sumVotosByPartidoYTipoCircunscripcion(
                    circ.getEleccion().getId(), circ.getTipoCircunscripcion().getId());
        } else {
            resultados = votoRepository.sumVotosByPartido(circ.getEleccion().getId());
        }
        Map<Long, Integer> mapa = new HashMap<>();
        for (Object[] row : resultados) {
            Long partidoId = ((Number) row[0]).longValue();
            Integer votos = ((Number) row[1]).intValue();
            mapa.merge(partidoId, votos, Integer::sum);
        }
        return mapa;
    }

    private ResultadoDHondtResponse buildResultadoVacio(Circunscripcion circ) {
        return ResultadoDHondtResponse.builder()
                .circunscripcionId(circ.getId())
                .circunscripcionNombre(circ.getNombre())
                .totalEscanos(circ.getEscanos())
                .totalVotosValidos(0)
                .umbralElectoral(circ.getUmbralElectoral())
                .asignaciones(List.of())
                .build();
    }

    private String toJson(Object obj) {
        try { return objectMapper.writeValueAsString(obj); }
        catch (JsonProcessingException e) { return "[]"; }
    }

    private List<Double> parseCocientes(String json) {
        try {
            if (json == null || json.isEmpty()) return List.of();
            return objectMapper.readValue(json, objectMapper.getTypeFactory()
                    .constructCollectionType(List.class, Double.class));
        } catch (Exception e) { return List.of(); }
    }

    private static class DHondtEntry {
        final Long partidoId;
        final double cociente;

        DHondtEntry(Long partidoId, int votos, int divisor) {
            this.partidoId = partidoId;
            this.cociente = (double) votos / divisor;
        }
    }
}
