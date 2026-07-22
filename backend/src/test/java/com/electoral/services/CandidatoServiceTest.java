package com.electoral.services;

import com.electoral.dto.CandidatoRequest;
import com.electoral.dto.CandidatoResponse;
import com.electoral.entities.*;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CandidatoServiceTest {

    @Mock private CandidatoRepository candidatoRepository;
    @Mock private PartidoRepository partidoRepository;
    @Mock private CargoRepository cargoRepository;
    @Mock private EleccionService eleccionService;
    @Mock private TipoCircunscripcionRepository tipoCircunscripcionRepository;
    @Mock private ProvinciaRepository provinciaRepository;
    @Mock private CantonRepository cantonRepository;
    @Mock private ParroquiaRepository parroquiaRepository;
    @Mock private ListaElectoralRepository listaElectoralRepository;
    @Mock private RuleEngine ruleEngine;
    @Mock private ReglaNegocioService reglaNegocioService;

    @InjectMocks
    private CandidatoService candidatoService;

    private Eleccion eleccion;
    private Cargo cargo;
    private Partido partido;
    private CandidatoRequest request;
    private Candidato candidato;

    @BeforeEach
    void setUp() {
        eleccion = Eleccion.builder().id(1L).nombre("Eleccion 2025").build();
        cargo = Cargo.builder().id(1L).nombre("Alcalde").build();
        partido = Partido.builder().id(1L).nombre("Partido A").sigla("PA").build();

        request = CandidatoRequest.builder()
                .nombre("Juan").apellido("Perez")
                .eleccionesId(1L).partidoId(1L).cargoId(1L)
                .build();

        candidato = Candidato.builder()
                .id(1L).nombre("Juan").apellido("Perez")
                .elecciones(eleccion).partido(partido).cargo(cargo)
                .build();
    }

    @Test
    void createCandidato_exitoso() {
        when(eleccionService.getEleccionEntityById(1L)).thenReturn(eleccion);
        when(cargoRepository.findById(1L)).thenReturn(Optional.of(cargo));
        when(partidoRepository.findById(1L)).thenReturn(Optional.of(partido));
        when(candidatoRepository.save(any(Candidato.class))).thenReturn(candidato);
        when(reglaNegocioService.obtenerReglasActivas("CANDIDATOS", "VALIDACION")).thenReturn(List.of());

        CandidatoResponse response = candidatoService.createCandidato(request);

        assertNotNull(response);
        assertEquals("Juan", response.getNombre());
        assertEquals("Perez", response.getApellido());
        assertEquals("Partido A", response.getPartidoNombre());
        verify(candidatoRepository).save(any(Candidato.class));
    }

    @Test
    void createCandidato_duplicado_lanzaExcepcion() {
        when(eleccionService.getEleccionEntityById(1L)).thenReturn(eleccion);
        when(cargoRepository.findById(1L)).thenReturn(Optional.of(cargo));
        when(partidoRepository.findById(1L)).thenReturn(Optional.of(partido));
        when(candidatoRepository.existsByEleccionesIdAndPartidoIdAndCargoId(1L, 1L, 1L)).thenReturn(true);

        assertThrows(DuplicateEntityException.class, () -> candidatoService.createCandidato(request));
        verify(candidatoRepository, never()).save(any());
    }

    @Test
    void getCandidatoById_exitoso() {
        when(candidatoRepository.findById(1L)).thenReturn(Optional.of(candidato));

        CandidatoResponse response = candidatoService.getCandidatoById(1L);

        assertNotNull(response);
        assertEquals("Juan Perez", response.getNombreCompleto());
    }

    @Test
    void getCandidatoById_noEncontrado_lanzaExcepcion() {
        when(candidatoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RecursoNoEncontradoException.class, () -> candidatoService.getCandidatoById(99L));
    }

    @Test
    void deleteCandidato_exitoso() {
        when(candidatoRepository.existsById(1L)).thenReturn(true);

        candidatoService.deleteCandidato(1L);

        verify(candidatoRepository).deleteById(1L);
    }

    @Test
    void deleteCandidato_noEncontrado_lanzaExcepcion() {
        when(candidatoRepository.existsById(99L)).thenReturn(false);

        assertThrows(RecursoNoEncontradoException.class, () -> candidatoService.deleteCandidato(99L));
        verify(candidatoRepository, never()).deleteById(any());
    }
}
