package com.electoral.services;

import com.electoral.dto.PlantillaPapeletaResponse;
import com.electoral.entities.PlantillaPapeleta;
import com.electoral.repositories.PlantillaPapeletaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlantillaPapeletaService {

    private final PlantillaPapeletaRepository repository;

    public List<PlantillaPapeletaResponse> getAll() {
        return repository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private PlantillaPapeletaResponse mapToResponse(PlantillaPapeleta p) {
        return PlantillaPapeletaResponse.builder()
                .id(p.getId()).nombre(p.getNombre())
                .tipoDiseno(p.getTipoDiseno())
                .cantidadColumnas(p.getCantidadColumnas())
                .cantidadFilas(p.getCantidadFilas())
                .posicionLogo(p.getPosicionLogo())
                .posicionNumero(p.getPosicionNumero())
                .posicionCandidatos(p.getPosicionCandidatos())
                .colorFondo(p.getColorFondo())
                .descripcion(p.getDescripcion())
                .build();
    }
}
