package com.electoral.services;

import com.electoral.dto.ResultadoDHondtResponse;
import com.electoral.entities.*;
import com.electoral.repositories.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DHondtServiceTest {

    @Mock private CircunscripcionRepository circunscripcionRepository;
    @Mock private AsignacionEscanoRepository asignacionEscanoRepository;
    @Mock private VotoRepository votoRepository;
    @Mock private PartidoRepository partidoRepository;
    @Mock private ObjectMapper objectMapper;

    @InjectMocks
    private DHondtService dhondtService;

    private Circunscripcion circunscripcion;
    private Partido partidoA, partidoB, partidoC;

    @BeforeEach
    void setUp() {
        Eleccion eleccion = Eleccion.builder().id(1L).nombre("Eleccion").build();
        TipoCircunscripcion tipo = TipoCircunscripcion.builder().id(1L).codigo("PROVINCIAL").build();
        partidoA = Partido.builder().id(1L).nombre("Partido A").sigla("PA").build();
        partidoB = Partido.builder().id(2L).nombre("Partido B").sigla("PB").build();
        partidoC = Partido.builder().id(3L).nombre("Partido C").sigla("PC").build();

        circunscripcion = Circunscripcion.builder()
                .id(1L).eleccion(eleccion).tipoCircunscripcion(tipo)
                .nombre("Provincial").escanos(5).umbralElectoral(5.0)
                .metodoAsignacion("D_HONDT").build();
    }

    @Test
    void calcular_dhondt_asignaEscanosCorrectamente() throws Exception {
        when(circunscripcionRepository.findById(1L)).thenReturn(java.util.Optional.of(circunscripcion));
        when(votoRepository.sumVotosByPartidoYTipoCircunscripcion(1L, 1L))
                .thenReturn(List.<Object[]>of(
                        new Object[]{1L, 100L},
                        new Object[]{2L, 60L},
                        new Object[]{3L, 40L}
                ));
        when(partidoRepository.findById(1L)).thenReturn(java.util.Optional.of(partidoA));
        when(partidoRepository.findById(2L)).thenReturn(java.util.Optional.of(partidoB));
        when(partidoRepository.findById(3L)).thenReturn(java.util.Optional.of(partidoC));
        when(objectMapper.writeValueAsString(any())).thenReturn("[]");

        ResultadoDHondtResponse result = dhondtService.calcular(1L);

        assertNotNull(result);
        assertEquals(5, result.getTotalEscanos());
        assertEquals(200, result.getTotalVotosValidos());
        assertEquals(5.0, result.getUmbralElectoral());
        assertEquals(3, result.getAsignaciones().size());

        int escanosA = result.getAsignaciones().stream()
                .filter(a -> a.getPartidoId().equals(1L))
                .findFirst().get().getEscanosAsignados();
        int escanosB = result.getAsignaciones().stream()
                .filter(a -> a.getPartidoId().equals(2L))
                .findFirst().get().getEscanosAsignados();

        assertEquals(3, escanosA);
        assertEquals(1, escanosB);

        verify(asignacionEscanoRepository, times(1)).deleteByCircunscripcionId(1L);
        verify(asignacionEscanoRepository, times(3)).save(any());
    }

    @Test
    void calcular_conUmbral_filtraPartidos() throws Exception {
        circunscripcion.setUmbralElectoral(30.0);
        when(circunscripcionRepository.findById(1L)).thenReturn(java.util.Optional.of(circunscripcion));
        when(votoRepository.sumVotosByPartidoYTipoCircunscripcion(1L, 1L))
                .thenReturn(List.<Object[]>of(
                        new Object[]{1L, 100L},
                        new Object[]{2L, 60L},
                        new Object[]{3L, 40L}
                ));
        when(partidoRepository.findById(1L)).thenReturn(java.util.Optional.of(partidoA));
        when(partidoRepository.findById(2L)).thenReturn(java.util.Optional.of(partidoB));
        when(objectMapper.writeValueAsString(any())).thenReturn("[]");

        ResultadoDHondtResponse result = dhondtService.calcular(1L);

        assertNotNull(result);
        assertEquals(2, result.getAsignaciones().size());
        assertTrue(result.getAsignaciones().stream().noneMatch(a -> a.getPartidoId().equals(3L)));
    }

    @Test
    void calcular_escanosCero_retornaVacio() throws Exception {
        circunscripcion.setEscanos(0);
        when(circunscripcionRepository.findById(1L)).thenReturn(java.util.Optional.of(circunscripcion));
        when(votoRepository.sumVotosByPartidoYTipoCircunscripcion(1L, 1L))
                .thenReturn(java.util.Collections.singletonList(new Object[]{1L, 100L}));
        when(partidoRepository.findById(1L)).thenReturn(java.util.Optional.of(partidoA));
        when(objectMapper.writeValueAsString(any())).thenReturn("[]");

        ResultadoDHondtResponse result = dhondtService.calcular(1L);

        assertNotNull(result);
        assertEquals(0, result.getTotalEscanos());
    }
}
