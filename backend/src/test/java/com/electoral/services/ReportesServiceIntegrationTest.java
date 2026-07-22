package com.electoral.services;

import com.electoral.dto.ReporteCandidatoDTO;
import com.electoral.dto.ReportePartidoDTO;
import com.electoral.dto.ReporteResumenDTO;
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

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ReportesServiceIntegrationTest {

    @Autowired private ReportesService reportesService;
    @Autowired private EleccionRepository eleccionRepository;
    @Autowired private PartidoRepository partidoRepository;
    @Autowired private CargoRepository cargoRepository;
    @Autowired private CandidatoRepository candidatoRepository;
    @Autowired private MesaRepository mesaRepository;
    @Autowired private VotoRepository votoRepository;
    @Autowired private InstitucionEducativaRepository institucionRepository;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private RolRepository rolRepository;
    @Autowired private ZonaRepository zonaRepository;
    @Autowired private ProvinciaRepository provinciaRepository;
    @Autowired private CantonRepository cantonRepository;
    @Autowired private ParroquiaRepository parroquiaRepository;

    private Eleccion eleccion;
    private Candidato candidato1, candidato2;
    private Mesa mesa1, mesa2;

    @BeforeEach
    void setUp() {
        eleccion = eleccionRepository.save(Eleccion.builder()
                .nombre("Eleccion Test Reportes").activa(true)
                .fechaInicio(LocalDateTime.now().minusDays(1))
                .fechaFin(LocalDateTime.now().plusDays(1))
                .build());

        Partido partido1 = partidoRepository.save(Partido.builder()
                .nombre("Partido A").sigla("PA").elecciones(eleccion).build());
        Partido partido2 = partidoRepository.save(Partido.builder()
                .nombre("Partido B").sigla("PB").elecciones(eleccion).build());

        Cargo cargo = cargoRepository.save(Cargo.builder()
                .nombre("Alcalde").elecciones(eleccion).build());

        candidato1 = candidatoRepository.save(Candidato.builder()
                .nombre("Juan").apellido("Perez")
                .partido(partido1).cargo(cargo).elecciones(eleccion)
                .build());
        candidato2 = candidatoRepository.save(Candidato.builder()
                .nombre("Maria").apellido("Lopez")
                .partido(partido2).cargo(cargo).elecciones(eleccion)
                .build());

        Zona zona = zonaRepository.save(Zona.builder().nombre("Zona Test").build());
        Provincia provincia = provinciaRepository.save(Provincia.builder().nombre("Provincia Test").zona(zona).build());
        Canton canton = cantonRepository.save(Canton.builder().nombre("Canton Test").provincia(provincia).build());
        Parroquia parroquia = parroquiaRepository.save(Parroquia.builder().nombre("Parroquia Test").canton(canton).build());

        InstitucionEducativa inst = institucionRepository.save(InstitucionEducativa.builder()
                .nombre("Escuela Central").parroquia(parroquia).build());

        mesa1 = mesaRepository.save(Mesa.builder()
                .numero("001").sexo(Mesa.SexoMesa.MIXTA)
                .institucion(inst).elecciones(eleccion).cerrada(true)
                .votosNulos(2).votosBlanco(1)
                .build());
        mesa2 = mesaRepository.save(Mesa.builder()
                .numero("002").sexo(Mesa.SexoMesa.MUJERES)
                .institucion(inst).elecciones(eleccion).cerrada(false)
                .votosNulos(1).votosBlanco(0)
                .build());

        Rol rol = rolRepository.findByNombre("ADMIN").orElseGet(() ->
                rolRepository.save(Rol.builder().nombre("ADMIN").build()));
        Usuario user = usuarioRepository.save(Usuario.builder()
                .username("test").password("pass").nombre("Test").apellido("User")
                .email("test@test.com")
                .rol(rol)
                .build());

        Voto v1 = Voto.builder()
                .candidato(candidato1).mesa(mesa1).elecciones(eleccion)
                .cantidadVotos(30).createdBy(user).build();
        Voto v2 = Voto.builder()
                .candidato(candidato2).mesa(mesa1).elecciones(eleccion)
                .cantidadVotos(20).createdBy(user).build();
        Voto v3 = Voto.builder()
                .candidato(candidato1).mesa(mesa2).elecciones(eleccion)
                .cantidadVotos(10).createdBy(user).build();

        votoRepository.saveAll(List.of(v1, v2, v3));
    }

    @Test
    void getResumen_retornaDatosCorrectos() {
        ReporteResumenDTO resumen = reportesService.getResumen(eleccion.getId());

        assertNotNull(resumen);
        assertEquals(60, resumen.getTotalVotos());
        assertEquals(2, resumen.getTotalMesas());
        assertEquals(1, resumen.getMesasCerradas());
        assertEquals(1, resumen.getMesasPendientes());
        assertEquals(4, resumen.getVotosNulos() + resumen.getVotosBlanco());
        assertEquals(2, resumen.getTotalCandidatos());
        assertEquals(2, resumen.getTotalPartidos());
        assertEquals(50.0, resumen.getParticipacion(), 0.01);
    }

    @Test
    void getResultadosCandidatos_retornaOrdenados() {
        List<ReporteCandidatoDTO> resultados = reportesService.getResultadosCandidatos(eleccion.getId());

        assertNotNull(resultados);
        assertEquals(2, resultados.size());
        assertEquals(40, resultados.get(0).getTotalVotos());
        assertEquals("Juan Perez", resultados.get(0).getNombreCompleto());
        assertEquals(20, resultados.get(1).getTotalVotos());
        assertTrue(resultados.get(0).getPorcentaje() > resultados.get(1).getPorcentaje());
    }

    @Test
    void getResultadosPartidos_retornaAgrupados() {
        List<ReportePartidoDTO> resultados = reportesService.getResultadosPartidos(eleccion.getId());

        assertNotNull(resultados);
        assertEquals(2, resultados.size());
        long total = resultados.stream().mapToLong(ReportePartidoDTO::getTotalVotos).sum();
        assertEquals(60, total);
    }

    @Test
    void exportCsv_generaContenido() {
        String csv = reportesService.exportCsv(eleccion.getId());

        assertNotNull(csv);
        assertTrue(csv.contains("Candidato,Partido,Cargo,Votos,Porcentaje"));
        assertTrue(csv.contains("Juan Perez"));
        assertTrue(csv.contains("Maria Lopez"));
        assertTrue(csv.contains("Partido A"));
        assertTrue(csv.contains("Partido B"));
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
    void getResumen_sinVotos_retornaCeros() {
        Eleccion nueva = eleccionRepository.save(Eleccion.builder()
                .nombre("Eleccion Vacia").activa(true)
                .fechaInicio(LocalDateTime.now().minusDays(1))
                .fechaFin(LocalDateTime.now().plusDays(1))
                .build());

        ReporteResumenDTO resumen = reportesService.getResumen(nueva.getId());

        assertEquals(0, resumen.getTotalVotos());
        assertEquals(0, resumen.getTotalMesas());
        assertEquals(0, resumen.getParticipacion(), 0.01);
    }
}
