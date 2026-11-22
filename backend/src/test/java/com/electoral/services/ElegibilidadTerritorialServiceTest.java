package com.electoral.services;

import com.electoral.entities.*;
import com.electoral.exception.ValidacionException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/** Matriz de comportamiento de la seccion 4 de la especificacion (sin mocks: logica real). */
class ElegibilidadTerritorialServiceTest {

    private final ElegibilidadTerritorialService service = new ElegibilidadTerritorialService();

    private Eleccion eleccion;
    private Provincia provinciaA, provinciaB;
    private Canton cantonA, cantonB;
    private Parroquia parroquiaUrbana, parroquiaRural, parroquiaSinTipo;
    private TipoCircunscripcion urbana, rural;
    private Mesa mesaUrbana, mesaRural, mesaSinTipo;

    @BeforeEach
    void setUp() {
        eleccion = Eleccion.builder().id(10L).nombre("ELECCIONES 2026").build();
        provinciaA = Provincia.builder().id(1L).nombre("Provincia A").build();
        provinciaB = Provincia.builder().id(2L).nombre("Provincia B").build();
        cantonA = Canton.builder().id(11L).nombre("Canton A").provincia(provinciaA).build();
        cantonB = Canton.builder().id(12L).nombre("Canton B").provincia(provinciaB).build();
        parroquiaUrbana = Parroquia.builder().id(100L).nombre("Urbana").canton(cantonA).tipoParroquia(TipoParroquia.URBANA).build();
        parroquiaRural = Parroquia.builder().id(101L).nombre("Rural").canton(cantonA).tipoParroquia(TipoParroquia.RURAL).build();
        parroquiaSinTipo = Parroquia.builder().id(102L).nombre("Pendiente").canton(cantonA).build();
        urbana = TipoCircunscripcion.builder().id(13L).codigo("URBANA").nombre("Urbana").build();
        rural = TipoCircunscripcion.builder().id(14L).codigo("RURAL").nombre("Rural").build();
        mesaUrbana = mesa(parroquiaUrbana);
        mesaRural = mesa(parroquiaRural);
        mesaSinTipo = mesa(parroquiaSinTipo);
    }

    private Mesa mesa(Parroquia p) {
        return Mesa.builder().id(1L).numero("001")
                .institucion(InstitucionEducativa.builder().id(1L).nombre("Escuela").parroquia(p).build())
                .elecciones(eleccion).build();
    }

    private Candidato candidato(Cargo cargo, Canton canton, Provincia provincia, TipoCircunscripcion circ) {
        return Candidato.builder().id(1L).nombre("Juan").apellido("Perez")
                .elecciones(eleccion).cargo(cargo)
                .canton(canton).provincia(provincia).tipoCircunscripcion(circ).build();
    }

    private Cargo cargoConcejal(String codigo) {
        return Cargo.builder().id(1L).nombre("CONSEJAL - " + codigo)
                .elecciones(eleccion).territorio(TipoTerritorio.CANTON)
                .tipoCircunscripcion("URBANA".equals(codigo) ? urbana : rural).build();
    }

    @Test
    void concejalUrbano_enParroquiaUrbana_mostrar() {
        assertTrue(service.esCandidatoElegible(
                candidato(cargoConcejal("URBANA"), cantonA, null, null), mesaUrbana));
    }

    @Test
    void concejalRural_enParroquiaUrbana_noMostrar() {
        assertFalse(service.esCandidatoElegible(
                candidato(cargoConcejal("RURAL"), cantonA, null, null), mesaUrbana));
    }

    @Test
    void concejalRural_enParroquiaRural_mostrar() {
        assertTrue(service.esCandidatoElegible(
                candidato(cargoConcejal("RURAL"), cantonA, null, null), mesaRural));
    }

    @Test
    void concejalUrbano_enParroquiaRural_noMostrar() {
        assertFalse(service.esCandidatoElegible(
                candidato(cargoConcejal("URBANA"), cantonA, null, null), mesaRural));
    }

    @Test
    void concejalUrbano_deOtroCanton_noMostrar() {
        assertFalse(service.esCandidatoElegible(
                candidato(cargoConcejal("URBANA"), cantonB, null, null), mesaUrbana));
    }

    @Test
    void parroquiaSinClasificacion_bloqueaConcejalYReporta() {
        Candidato c = candidato(cargoConcejal("URBANA"), cantonA, null, null);
        assertFalse(service.esCandidatoElegible(c, mesaSinTipo));
        ValidacionException ex = assertThrows(ValidacionException.class,
                () -> service.exigirCandidatoElegible(c, mesaSinTipo));
        assertTrue(ex.getMessage().contains("clasificación"));
        assertThrows(ValidacionException.class,
                () -> service.exigirClasificacionSiAplica(mesaSinTipo, List.of(c)));
    }

    @Test
    void alcaldeConservaReglaCantonal_enParroquiasDeAmbosTipos() {
        Cargo alcalde = Cargo.builder().id(2L).nombre("ALCALDE").elecciones(eleccion)
                .territorio(TipoTerritorio.CANTON)
                .tipoCircunscripcion(TipoCircunscripcion.builder().codigo("CANTONAL").build()).build();
        Candidato c = candidato(alcalde, cantonA, null, null);
        assertTrue(service.esCandidatoElegible(c, mesaUrbana));
        assertTrue(service.esCandidatoElegible(c, mesaRural));
        Mesa mesaOtroCanton = Mesa.builder().id(2L).institucion(InstitucionEducativa.builder()
                .parroquia(Parroquia.builder().id(200L).canton(cantonB)
                        .tipoParroquia(TipoParroquia.URBANA).build()).build())
                .elecciones(eleccion).build();
        assertFalse(service.esCandidatoElegible(c, mesaOtroCanton));
    }

    @Test
    void prefectoConservaReglaProvincial() {
        Cargo prefecto = Cargo.builder().id(3L).nombre("PREFECTO").elecciones(eleccion)
                .territorio(TipoTerritorio.PROVINCIA).build();
        assertTrue(service.esCandidatoElegible(candidato(prefecto, null, provinciaA, null), mesaRural));
        assertFalse(service.esCandidatoElegible(candidato(prefecto, null, provinciaB, null), mesaRural));
    }

    @Test
    void cargoNacional_siempreVisible() {
        Cargo nacional = Cargo.builder().id(4L).nombre("PRESIDENTE").elecciones(eleccion)
                .territorio(TipoTerritorio.NACIONAL).build();
        assertTrue(service.esCandidatoElegible(candidato(nacional, cantonB, provinciaB, null), mesaUrbana));
    }

    @Test
    void candidatoSinTerritorio_compatibleConDatosHistoricos() {
        assertTrue(service.esCandidatoElegible(candidato(cargoConcejal("URBANA"), null, null, null), mesaUrbana));
    }

    @Test
    void procesoElectoralDistinto_bloquea() {
        Candidato c = candidato(cargoConcejal("URBANA"), cantonA, null, null);
        c.setElecciones(Eleccion.builder().id(99L).nombre("OTRA ELECCION").build());
        assertFalse(service.esCandidatoElegible(c, mesaUrbana));
    }

    @Test
    void circunscripcionDelCandidatoIncoherente_bloquea() {
        Candidato c = candidato(cargoConcejal("URBANA"), cantonA, null, rural);
        assertFalse(service.esCandidatoElegible(c, mesaUrbana));
    }
}
