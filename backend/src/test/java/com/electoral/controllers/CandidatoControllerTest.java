package com.electoral.controllers;

import com.electoral.config.JwtService;
import com.electoral.dto.CandidatoRequest;
import com.electoral.dto.CandidatoResponse;
import com.electoral.services.CandidatoService;
import com.electoral.services.ExcelExportService;
import com.electoral.services.PdfExportService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(value = CandidatoController.class, excludeAutoConfiguration = {UserDetailsServiceAutoConfiguration.class})
@Import(CandidatoControllerTest.TestSecurityConfig.class)
class CandidatoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CandidatoService candidatoService;

    @MockBean
    private ExcelExportService excelExportService;

    @MockBean
    private PdfExportService pdfExportService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private org.springframework.security.core.userdetails.UserDetailsService userDetailsService;

    @Test
    @WithMockUser(roles = "ADMIN")
    void getCandidatosByEleccion_retornaLista() throws Exception {
        CandidatoResponse response = CandidatoResponse.builder()
                .id(1L).nombre("Juan").apellido("Perez")
                .nombreCompleto("Juan Perez").partidoNombre("Partido A")
                .build();

        when(candidatoService.getCandidatosByEleccion(1L)).thenReturn(List.of(response));

        mockMvc.perform(get("/api/candidatos/eleccion/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombre").value("Juan"))
                .andExpect(jsonPath("$[0].apellido").value("Perez"))
                .andExpect(jsonPath("$[0].nombreCompleto").value("Juan Perez"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void createCandidato_retornaCreado() throws Exception {
        CandidatoRequest request = CandidatoRequest.builder()
                .nombre("Juan").apellido("Perez")
                .eleccionesId(1L).partidoId(1L).cargoId(1L)
                .build();

        CandidatoResponse response = CandidatoResponse.builder()
                .id(1L).nombre("Juan").apellido("Perez")
                .nombreCompleto("Juan Perez").partidoNombre("Partido A")
                .build();

        when(candidatoService.createCandidato(any(CandidatoRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/candidatos")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Juan"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void deleteCandidato_retornaNoContent() throws Exception {
        mockMvc.perform(delete("/api/candidatos/1").with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser(roles = "SUPERVISOR")
    void createCandidato_sinRolAdmin_retorna403() throws Exception {
        CandidatoRequest request = CandidatoRequest.builder()
                .nombre("Juan").apellido("Perez")
                .eleccionesId(1L).partidoId(1L).cargoId(1L)
                .build();

        mockMvc.perform(post("/api/candidatos")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());
    }

    @TestConfiguration
    @EnableWebSecurity
    @EnableMethodSecurity
    static class TestSecurityConfig {
        @Bean
        SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http.csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
            return http.build();
        }
    }
}
