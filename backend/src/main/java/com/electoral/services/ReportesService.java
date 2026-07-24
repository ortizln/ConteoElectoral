package com.electoral.services;

import com.electoral.dto.ReporteCandidatoDTO;
import com.electoral.dto.ReporteListaDTO;
import com.electoral.dto.ReportePartidoDTO;
import com.electoral.dto.ReporteResumenDTO;
import com.electoral.entities.Candidato;
import com.electoral.entities.ListaElectoral;
import com.electoral.repositories.CandidatoRepository;
import com.electoral.repositories.ListaElectoralRepository;
import com.electoral.repositories.MesaRepository;
import com.electoral.repositories.PartidoRepository;
import com.electoral.repositories.VotoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportesService {

    private final VotoRepository votoRepository;
    private final MesaRepository mesaRepository;
    private final CandidatoRepository candidatoRepository;
    private final PartidoRepository partidoRepository;
    private final ListaElectoralRepository listaElectoralRepository;

    public ReporteResumenDTO getResumen(Long eleccionId) {
        long totalVotos = votoRepository.sumVotosByEleccion(eleccionId) != null
                ? votoRepository.sumVotosByEleccion(eleccionId) : 0L;
        long totalMesas = mesaRepository.countByEleccionesId(eleccionId);
        long mesasCerradas = mesaRepository.countByEleccionesIdAndCerrada(eleccionId, true);
        long totalCandidatos = candidatoRepository.countByEleccionesId(eleccionId);
        long totalPartidos = partidoRepository.countByEleccionesId(eleccionId);
        long votosNulos = 0L;
        long votosBlanco = 0L;

        var mesas = mesaRepository.findByEleccionesId(eleccionId);
        if (mesas != null && !mesas.isEmpty()) {
            var mesaIds = mesas.stream().map(m -> m.getId()).collect(Collectors.toList());
            if (!mesaIds.isEmpty()) {
                Long nulos = mesaRepository.sumVotosNulosByMesaIds(mesaIds);
                Long blanco = mesaRepository.sumVotosBlancoByMesaIds(mesaIds);
                votosNulos = nulos != null ? nulos : 0L;
                votosBlanco = blanco != null ? blanco : 0L;
            }
        }

        double participacion = totalMesas > 0
                ? (double) mesasCerradas / totalMesas * 100.0 : 0.0;

        return ReporteResumenDTO.builder()
                .totalVotos(totalVotos)
                .totalMesas(totalMesas)
                .mesasCerradas(mesasCerradas)
                .mesasPendientes(totalMesas - mesasCerradas)
                .totalCandidatos(totalCandidatos)
                .totalPartidos(totalPartidos)
                .votosNulos(votosNulos)
                .votosBlanco(votosBlanco)
                .participacion(Math.round(participacion * 100.0) / 100.0)
                .build();
    }

    public List<ReporteCandidatoDTO> getResultadosCandidatos(Long eleccionId) {
        List<ReporteCandidatoDTO> resultados = new ArrayList<>();
        List<Object[]> raw = votoRepository.sumVotosGroupByCandidato(eleccionId);

        long totalGeneral = raw != null ? raw.stream()
                .mapToLong(r -> ((Number) r[1]).longValue())
                .sum() : 0;

        Map<Long, Long> votosMap = raw != null ? raw.stream()
                .collect(Collectors.toMap(
                        r -> ((Number) r[0]).longValue(),
                        r -> ((Number) r[1]).longValue()
                )) : new HashMap<>();

        List<Candidato> todos = candidatoRepository.findByEleccionesId(eleccionId);
        for (Candidato c : todos) {
            long votos = votosMap.getOrDefault(c.getId(), 0L);
            double pct = totalGeneral > 0 ? (double) votos / totalGeneral * 100.0 : 0.0;

            resultados.add(ReporteCandidatoDTO.builder()
                    .id(c.getId())
                    .nombre(c.getNombre())
                    .apellido(c.getApellido())
                    .nombreCompleto(c.getNombre() + " " + c.getApellido())
                    .partido(c.getPartido() != null ? c.getPartido().getNombre() : "Independiente")
                    .partidoSigla(c.getPartido() != null && c.getPartido().getSigla() != null ? c.getPartido().getSigla() : "")
                    .cargo(c.getCargo() != null ? c.getCargo().getNombre() : "")
                    .totalVotos(votos)
                    .porcentaje(Math.round(pct * 100.0) / 100.0)
                    .build());
        }

        resultados.sort((a, b) -> Long.compare(b.getTotalVotos(), a.getTotalVotos()));
        return resultados;
    }

    @SuppressWarnings("unchecked")
    public List<ReportePartidoDTO> getResultadosPartidos(Long eleccionId) {
        List<ReportePartidoDTO> resultados = new ArrayList<>();
        List<Object[]> raw = votoRepository.sumVotosByPartido(eleccionId);
        if (raw == null) return resultados;

        long totalGeneral = raw.stream()
                .mapToLong(r -> ((Number) r[1]).longValue())
                .sum();

        for (Object[] row : raw) {
            Long partidoId = ((Number) row[0]).longValue();
            long votos = ((Number) row[1]).longValue();
            double pct = totalGeneral > 0 ? (double) votos / totalGeneral * 100.0 : 0.0;

            var partido = partidoRepository.findById(partidoId);
            long totalCand = candidatoRepository.countByPartidoId(partidoId);

            resultados.add(ReportePartidoDTO.builder()
                    .id(partidoId)
                    .nombre(partido.map(p -> p.getNombre()).orElse(""))
                    .sigla(partido.map(p -> p.getSigla()).orElse(""))
                    .totalVotos(votos)
                    .porcentaje(Math.round(pct * 100.0) / 100.0)
                    .totalCandidatos(totalCand)
                    .build());
        }

        resultados.sort((a, b) -> Long.compare(b.getTotalVotos(), a.getTotalVotos()));
        return resultados;
    }

    public List<ReporteListaDTO> getResultadosListas(Long eleccionId) {
        List<ReporteListaDTO> resultados = new ArrayList<>();
        List<Object[]> raw = votoRepository.sumVotosGroupByLista(eleccionId);
        if (raw == null || raw.isEmpty()) return resultados;

        long totalGeneral = raw.stream()
                .mapToLong(r -> ((Number) r[1]).longValue())
                .sum();

        Map<Long, Long> votosMap = raw.stream()
                .collect(Collectors.toMap(
                        r -> ((Number) r[0]).longValue(),
                        r -> ((Number) r[1]).longValue()
                ));

        List<ListaElectoral> listas = listaElectoralRepository.findByEleccionId(eleccionId);
        for (ListaElectoral l : listas) {
            Long votos = votosMap.get(l.getId());
            if (votos == null) continue;
            double pct = totalGeneral > 0 ? (double) votos / totalGeneral * 100.0 : 0.0;
            resultados.add(ReporteListaDTO.builder()
                    .listaId(l.getId())
                    .listaNombre(l.getNombre())
                    .numeroLista(l.getNumeroLista())
                    .partidoId(l.getPartido() != null ? l.getPartido().getId() : null)
                    .partidoNombre(l.getPartido() != null ? l.getPartido().getNombre() : "Independiente")
                    .partidoSigla(l.getPartido() != null ? l.getPartido().getSigla() : "")
                    .cargoId(l.getCargo() != null ? l.getCargo().getId() : null)
                    .cargoNombre(l.getCargo() != null ? l.getCargo().getNombre() : "")
                    .totalVotos(votos)
                    .porcentaje(Math.round(pct * 100.0) / 100.0)
                    .build());
        }

        resultados.sort((a, b) -> Long.compare(b.getTotalVotos(), a.getTotalVotos()));
        return resultados;
    }

    public String exportCsv(Long eleccionId) {
        List<ReporteCandidatoDTO> candidatos = getResultadosCandidatos(eleccionId);
        StringBuilder sb = new StringBuilder();
        sb.append("Candidato,Partido,Cargo,Votos,Porcentaje\n");
        for (ReporteCandidatoDTO c : candidatos) {
            sb.append(String.format("\"%s\",\"%s\",\"%s\",%d,%.2f%%\n",
                    c.getNombreCompleto(), c.getPartido(), c.getCargo(),
                    c.getTotalVotos(), c.getPorcentaje()));
        }
        return sb.toString();
    }
}
