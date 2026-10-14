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
    @Autowired private MesaUsuarioRepository mesaUsuarioRepository;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private SyncOperationLogRepository syncOperationLogRepository;

    private Eleccion eleccion;
    private Candidato candidato;
    private Mesa mesa;
    private Usuario usuario;

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

        usuario = usuarioRepository.findById(1L).orElse(null);
        if (usuario == null) {
            usuario = usuarioRepository.save(Usuario.builder()
                    .username("testuser").password("pass")
                    .nombre("Test").apellido("User")
                    .build());
        }

        mesaUsuarioRepository.save(MesaUsuario.builder()
                .mesa(mesa).usuario(usuario).build());
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

        SyncPushResponse response = syncService.processPush(request, usuario.getId());

        assertNotNull(response);
        assertFalse(response.getResults().isEmpty());
        SyncResultDTO result = response.getResults().get(0);
        assertTrue(result.isSuccess());
        assertNotNull(result.getServerId());

        long total = votoRepository.sumVotosByEleccion(eleccion.getId());
        assertEquals(10, total);
    }

    @Test
    void processPush_creaVoto_Sobrescribe() {
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
        syncService.processPush(req1, usuario.getId());

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
        SyncPushResponse response = syncService.processPush(req2, usuario.getId());

        assertTrue(response.getResults().get(0).isSuccess());
        long total = votoRepository.sumVotosByEleccion(eleccion.getId());
        assertEquals(5, total, "CREATE con mismo candidato+mesa sobrescribe cantidadVotos");
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

        SyncPushResponse response = syncService.processPush(request, usuario.getId());

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
        syncService.processPush(request, usuario.getId());

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

        SyncPushResponse response = syncService.processPush(request, usuario.getId());

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

        SyncPushResponse response = syncService.processPush(request, usuario.getId());

        assertEquals(2, response.getResults().size());
        assertTrue(response.getResults().get(0).isSuccess());
        assertTrue(response.getResults().get(1).isSuccess());
    }

    @Test
    void processPush_idempotencia_operationIdDuplicado() {
        SyncPushRequest request = SyncPushRequest.builder()
                .operations(List.of(SyncOperationDTO.builder()
                        .operationId("idem-op-1").entity("voto").action("CREATE")
                        .entityId(0L)
                        .data(Map.of(
                                "candidatoId", candidato.getId(),
                                "mesaId", mesa.getId(),
                                "cantidadVotos", 20,
                                "eleccionesId", eleccion.getId()
                        ))
                        .build()))
                .build();

        SyncPushResponse response1 = syncService.processPush(request, usuario.getId());
        assertTrue(response1.getResults().get(0).isSuccess());
        long total1 = votoRepository.sumVotosByEleccion(eleccion.getId());
        assertEquals(20, total1);

        SyncPushResponse response2 = syncService.processPush(request, usuario.getId());
        assertTrue(response2.getResults().get(0).isSuccess());
        long total2 = votoRepository.sumVotosByEleccion(eleccion.getId());
        assertEquals(20, total2, "No debe duplicar voto con mismo operationId");

        assertTrue(syncOperationLogRepository.existsByOperationId("idem-op-1"));
    }

    @Test
    void processPush_votoEnMesaCerrada_retornaError() {
        mesa.setCerrada(true);
        mesaRepository.save(mesa);

        SyncPushRequest request = SyncPushRequest.builder()
                .operations(List.of(SyncOperationDTO.builder()
                        .operationId("op-cerrada").entity("voto").action("CREATE")
                        .entityId(0L)
                        .data(Map.of(
                                "candidatoId", candidato.getId(),
                                "mesaId", mesa.getId(),
                                "cantidadVotos", 10,
                                "eleccionesId", eleccion.getId()
                        ))
                        .build()))
                .build();

        SyncPushResponse response = syncService.processPush(request, usuario.getId());

        assertFalse(response.getResults().get(0).isSuccess());
        assertNotNull(response.getResults().get(0).getError());
        assertTrue(response.getResults().get(0).getError().contains("cerrada"));
    }

    @Test
    void processPush_votoEnMesaNoAsignada_retornaError() {
        mesaUsuarioRepository.deleteAll();

        SyncPushRequest request = SyncPushRequest.builder()
                .operations(List.of(SyncOperationDTO.builder()
                        .operationId("op-noasignada").entity("voto").action("CREATE")
                        .entityId(0L)
                        .data(Map.of(
                                "candidatoId", candidato.getId(),
                                "mesaId", mesa.getId(),
                                "cantidadVotos", 10,
                                "eleccionesId", eleccion.getId()
                        ))
                        .build()))
                .build();

        SyncPushResponse response = syncService.processPush(request, 999L);

        assertFalse(response.getResults().get(0).isSuccess());
        assertTrue(response.getResults().get(0).getError().contains("asignado"));
    }

    @Test
    void processPush_batchConOperacionFallida_lasDemasSeProcesan() {
        SyncPushRequest request = SyncPushRequest.builder()
                .operations(List.of(
                        SyncOperationDTO.builder()
                                .operationId("op-ok").entity("voto").action("CREATE")
                                .entityId(0L)
                                .data(Map.of(
                                        "candidatoId", candidato.getId(),
                                        "mesaId", mesa.getId(),
                                        "cantidadVotos", 8,
                                        "eleccionesId", eleccion.getId()
                                ))
                                .build(),
                        SyncOperationDTO.builder()
                                .operationId("op-fail").entity("voto").action("CREATE")
                                .entityId(0L)
                                .data(Map.of(
                                        "candidatoId", 99999L,
                                        "mesaId", mesa.getId(),
                                        "cantidadVotos", 5,
                                        "eleccionesId", eleccion.getId()
                                ))
                                .build()
                ))
                .build();

        SyncPushResponse response = syncService.processPush(request, usuario.getId());

        assertEquals(2, response.getResults().size());
        assertTrue(response.getResults().get(0).isSuccess());
        assertFalse(response.getResults().get(1).isSuccess());

        long total = votoRepository.sumVotosByEleccion(eleccion.getId());
        assertEquals(8, total, "Solo la operación válida debe procesarse");
    }
}
