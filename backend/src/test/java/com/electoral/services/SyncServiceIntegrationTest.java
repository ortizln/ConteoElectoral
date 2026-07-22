package com.electoral.services;

import com.electoral.dto.SyncOperationDTO;
import com.electoral.dto.SyncPullResponse;
import com.electoral.dto.SyncPushRequest;
import com.electoral.dto.SyncPushResponse;
import com.electoral.dto.SyncResultDTO;
import com.electoral.entities.*;
import com.electoral.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class SyncServiceIntegrationTest {

    @Autowired private SyncService syncService;
    @Autowired private EleccionRepository eleccionRepository;
    @Autowired private PartidoRepository partidoRepository;
    @Autowired private CargoRepository cargoRepository;
    @Autowired private CandidatoRepository candidatoRepository;
    @Autowired private MesaRepository mesaRepository;
    @Autowired private VotoRepository votoRepository;
    @Autowired private InstitucionEducativaRepository institucionRepository;
    @Autowired private ZonaRepository zonaRepository;
    @Autowired private ProvinciaRepository provinciaRepository;
    @Autowired private CantonRepository cantonRepository;
    @Autowired private ParroquiaRepository parroquiaRepository;

    private Eleccion eleccion;
    private Candidato candidato;
    private Mesa mesa;

    @BeforeEach
    void setUp() {
        eleccion = eleccionRepository.save(Eleccion.builder()
                .nombre("Eleccion Test").activa(true)
                .fechaInicio(LocalDateTime.now().minusDays(1))
                .fechaFin(LocalDateTime.now().plusDays(1))
                .build());

        Partido partido = partidoRepository.save(Partido.builder()
                .nombre("Partido Test").sigla("PT")
                .elecciones(eleccion).build());

        Cargo cargo = cargoRepository.save(Cargo.builder()
                .nombre("Diputado").elecciones(eleccion).build());

        candidato = candidatoRepository.save(Candidato.builder()
                .nombre("Test").apellido("Candidato")
                .partido(partido).cargo(cargo).elecciones(eleccion)
                .build());

        Zona zona = zonaRepository.save(Zona.builder().nombre("Zona Test").build());
        Provincia provincia = provinciaRepository.save(Provincia.builder().nombre("Provincia Test").zona(zona).build());
        Canton canton = cantonRepository.save(Canton.builder().nombre("Canton Test").provincia(provincia).build());
        Parroquia parroquia = parroquiaRepository.save(Parroquia.builder().nombre("Parroquia Test").canton(canton).build());

        InstitucionEducativa inst = institucionRepository.save(InstitucionEducativa.builder()
                .nombre("Escuela Test").parroquia(parroquia).build());

        mesa = mesaRepository.save(Mesa.builder()
                .numero("001").sexo(Mesa.SexoMesa.MIXTA)
                .institucion(inst).elecciones(eleccion)
                .build());
    }

    @Test
    void processPush_creaVoto() {
        SyncPushRequest request = SyncPushRequest.builder()
                .operations(List.of(SyncOperationDTO.builder()
                        .operationId("op-1").entity("voto").action("CREATE")
                        .entityId(0L)
                        .data(Map.of(
                                "candidatoId", candidato.getId(),
                                "mesaId", mesa.getId(),
                                "cantidadVotos", 10,
                                "eleccionesId", eleccion.getId()
                        ))
                        .build()))
                .build();

        SyncPushResponse response = syncService.processPush(request, 1L);

        assertNotNull(response);
        assertFalse(response.getResults().isEmpty());
        SyncResultDTO result = response.getResults().get(0);
        assertTrue(result.isSuccess());
        assertNotNull(result.getServerId());

        long total = votoRepository.sumVotosByEleccion(eleccion.getId());
        assertEquals(10, total);
    }

    @Test
    void processPush_creaVoto_Acumula() {
        SyncPushRequest req1 = SyncPushRequest.builder()
                .operations(List.of(SyncOperationDTO.builder()
                        .operationId("op-1").entity("voto").action("CREATE")
                        .entityId(0L)
                        .data(Map.of(
                                "candidatoId", candidato.getId(),
                                "mesaId", mesa.getId(),
                                "cantidadVotos", 7,
                                "eleccionesId", eleccion.getId()
                        ))
                        .build()))
                .build();
        syncService.processPush(req1, 1L);

        SyncPushRequest req2 = SyncPushRequest.builder()
                .operations(List.of(SyncOperationDTO.builder()
                        .operationId("op-2").entity("voto").action("CREATE")
                        .entityId(0L)
                        .data(Map.of(
                                "candidatoId", candidato.getId(),
                                "mesaId", mesa.getId(),
                                "cantidadVotos", 5,
                                "eleccionesId", eleccion.getId()
                        ))
                        .build()))
                .build();
        SyncPushResponse response = syncService.processPush(req2, 1L);

        assertTrue(response.getResults().get(0).isSuccess());
        long total = votoRepository.sumVotosByEleccion(eleccion.getId());
        assertEquals(12, total);
    }

    @Test
    void processPush_cierraMesa() {
        assertFalse(mesa.getCerrada());

        SyncPushRequest request = SyncPushRequest.builder()
                .operations(List.of(SyncOperationDTO.builder()
                        .operationId("op-1").entity("mesa").action("CERRAR")
                        .entityId(mesa.getId())
                        .data(Map.of("id", mesa.getId(), "cerrada", true))
                        .build()))
                .build();

        SyncPushResponse response = syncService.processPush(request, 1L);

        assertTrue(response.getResults().get(0).isSuccess());
        Mesa actualizada = mesaRepository.findById(mesa.getId()).orElseThrow();
        assertTrue(actualizada.getCerrada());
    }

    @Test
    void pullChanges_retornaVotosDesdeTimestamp() {
        SyncPushRequest request = SyncPushRequest.builder()
                .operations(List.of(SyncOperationDTO.builder()
                        .operationId("op-1").entity("voto").action("CREATE")
                        .entityId(0L)
                        .data(Map.of(
                                "candidatoId", candidato.getId(),
                                "mesaId", mesa.getId(),
                                "cantidadVotos", 15,
                                "eleccionesId", eleccion.getId()
                        ))
                        .build()))
                .build();
        syncService.processPush(request, 1L);

        SyncPullResponse pull = syncService.pullChanges(eleccion.getId(),
                LocalDateTime.now().minusHours(1).toString());

        assertNotNull(pull);
        assertFalse(pull.getOperations().isEmpty());
        assertEquals("voto", pull.getOperations().get(0).getEntity());
    }

    @Test
    void pullChanges_conTimestampFuturo_retornaVacio() {
        SyncPullResponse pull = syncService.pullChanges(eleccion.getId(),
                LocalDateTime.now().plusDays(1).toString());

        assertNotNull(pull);
        assertTrue(pull.getOperations().isEmpty());
    }

    @Test
    void processPush_entityDesconocida_retornaError() {
        SyncPushRequest request = SyncPushRequest.builder()
                .operations(List.of(SyncOperationDTO.builder()
                        .operationId("op-1").entity("unknown").action("TEST")
                        .entityId(0L).data(Map.of())
                        .build()))
                .build();

        SyncPushResponse response = syncService.processPush(request, 1L);

        assertFalse(response.getResults().get(0).isSuccess());
        assertNotNull(response.getResults().get(0).getError());
    }

    @TestConfiguration
    @EnableWebSecurity
    static class TestSecurityConfig {
        @Bean
        SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
            return http.build();
        }
    }

    @Test
    void processPush_batchMultiplesOperaciones() {
        SyncPushRequest request = SyncPushRequest.builder()
                .operations(List.of(
                        SyncOperationDTO.builder()
                                .operationId("op-1").entity("voto").action("CREATE")
                                .entityId(0L)
                                .data(Map.of(
                                        "candidatoId", candidato.getId(),
                                        "mesaId", mesa.getId(),
                                        "cantidadVotos", 5,
                                        "eleccionesId", eleccion.getId()
                                ))
                                .build(),
                        SyncOperationDTO.builder()
                                .operationId("op-2").entity("mesa").action("CERRAR")
                                .entityId(mesa.getId())
                                .data(Map.of("id", mesa.getId(), "cerrada", true))
                                .build()
                ))
                .build();

        SyncPushResponse response = syncService.processPush(request, 1L);

        assertEquals(2, response.getResults().size());
        assertTrue(response.getResults().get(0).isSuccess());
        assertTrue(response.getResults().get(1).isSuccess());
    }
}
