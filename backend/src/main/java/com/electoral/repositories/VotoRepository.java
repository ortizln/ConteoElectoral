package com.electoral.repositories;

import com.electoral.entities.Voto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
@SuppressWarnings("null")
public interface VotoRepository extends JpaRepository<Voto, Long> {
    
    @Query("SELECT v FROM Voto v JOIN FETCH v.candidato c LEFT JOIN FETCH c.partido LEFT JOIN FETCH v.mesa m LEFT JOIN FETCH v.elecciones e WHERE v.mesa.id = :mesaId")
    List<Voto> findByMesaId(@Param("mesaId") Long mesaId);
     
    @Query("SELECT v FROM Voto v JOIN FETCH v.candidato c LEFT JOIN FETCH c.partido LEFT JOIN FETCH v.mesa m LEFT JOIN FETCH v.elecciones e WHERE v.elecciones.id = :eleccionesId")
    List<Voto> findByEleccionesId(@Param("eleccionesId") Long eleccionesId);
     
    @Query("SELECT v FROM Voto v JOIN FETCH v.candidato c LEFT JOIN FETCH c.partido LEFT JOIN FETCH v.mesa m LEFT JOIN FETCH v.elecciones e WHERE v.id = :id")
    Optional<Voto> findById(@Param("id") Long id);
     
    List<Voto> findByCandidatoId(Long candidatoId);
     
    Optional<Voto> findByMesaIdAndCandidatoId(Long mesaId, Long candidatoId);
     
    @Query("SELECT COALESCE(SUM(v.cantidadVotos), 0) FROM Voto v WHERE v.elecciones.id = :eleccionId")
    Long sumVotosByEleccion(Long eleccionId);
     
    @Query("SELECT COALESCE(SUM(v.cantidadVotos), 0) FROM Voto v WHERE v.elecciones.id = :eleccionId AND v.mesa.id IN :mesaIds")
    Long sumVotosByEleccionAndMesaIds(@Param("eleccionId") Long eleccionId, @Param("mesaIds") List<Long> mesaIds);
     
    @Query("SELECT COALESCE(SUM(v.cantidadVotos), 0) FROM Voto v WHERE v.candidato.id = :candidatoId")
    Long sumVotosByCandidato(Long candidatoId);
     
    @Query("SELECT v.candidato.id, SUM(v.cantidadVotos) FROM Voto v WHERE v.elecciones.id = :eleccionId GROUP BY v.candidato.id")
    List<Object[]> sumVotosGroupByCandidato(Long eleccionId);
     
    @Query("SELECT v.candidato.id, SUM(v.cantidadVotos) FROM Voto v WHERE v.elecciones.id = :eleccionId AND v.mesa.id IN :mesaIds GROUP BY v.candidato.id")
    List<Object[]> sumVotosGroupByCandidatoAndMesaIds(@Param("eleccionId") Long eleccionId, @Param("mesaIds") List<Long> mesaIds);
     
    @Query("SELECT v.mesa.institucion.id, SUM(v.cantidadVotos) FROM Voto v WHERE v.elecciones.id = :eleccionId GROUP BY v.mesa.institucion.id")
    List<Object[]> sumVotosGroupByInstitucion(Long eleccionId);

    @Query("SELECT v.mesa.id, v.mesa.numero, v.mesa.institucion.nombre, v.mesa.institucion.parroquia.nombre, v.cantidadVotos FROM Voto v WHERE v.candidato.id = :candidatoId AND v.elecciones.id = :eleccionId ORDER BY v.mesa.institucion.parroquia.nombre, v.mesa.numero")
    List<Object[]> findVotosByCandidatoAndEleccion(@Param("candidatoId") Long candidatoId, @Param("eleccionId") Long eleccionId);

    @Query("SELECT z.id, z.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia p JOIN p.canton c JOIN c.provincia pr JOIN pr.zona z WHERE v.candidato.id = :candidatoId AND v.elecciones.id = :eleccionId GROUP BY z.id, z.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByZona(@Param("candidatoId") Long candidatoId, @Param("eleccionId") Long eleccionId);

    @Query("SELECT pr.id, pr.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia p JOIN p.canton c JOIN c.provincia pr WHERE v.candidato.id = :candidatoId AND v.elecciones.id = :eleccionId GROUP BY pr.id, pr.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByProvincia(@Param("candidatoId") Long candidatoId, @Param("eleccionId") Long eleccionId);

    @Query("SELECT c.id, c.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia p JOIN p.canton c WHERE v.candidato.id = :candidatoId AND v.elecciones.id = :eleccionId GROUP BY c.id, c.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByCanton(@Param("candidatoId") Long candidatoId, @Param("eleccionId") Long eleccionId);

    @Query("SELECT p.id, p.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia p WHERE v.candidato.id = :candidatoId AND v.elecciones.id = :eleccionId GROUP BY p.id, p.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByParroquia(@Param("candidatoId") Long candidatoId, @Param("eleccionId") Long eleccionId);

    @Query("SELECT i.id, i.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i WHERE v.candidato.id = :candidatoId AND v.elecciones.id = :eleccionId GROUP BY i.id, i.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByInstitucion(@Param("candidatoId") Long candidatoId, @Param("eleccionId") Long eleccionId);

    @Query("SELECT pr.id, pr.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia p JOIN p.canton c JOIN c.provincia pr WHERE v.elecciones.id = :eleccionId AND v.mesa.id IN :mesaIds GROUP BY pr.id, pr.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByProvinciaDashboard(@Param("eleccionId") Long eleccionId, @Param("mesaIds") List<Long> mesaIds);

    @Query("SELECT p.id, p.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia p WHERE v.elecciones.id = :eleccionId AND v.mesa.id IN :mesaIds GROUP BY p.id, p.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByParroquiaDashboard(@Param("eleccionId") Long eleccionId, @Param("mesaIds") List<Long> mesaIds);

    @Query("SELECT COALESCE(SUM(v.cantidadVotos), 0) FROM Voto v WHERE v.mesa.id = :mesaId AND v.elecciones.id = :eleccionId")
    Long sumVotosByMesaAndEleccion(@Param("mesaId") Long mesaId, @Param("eleccionId") Long eleccionId);

    @Query("SELECT c.partido.id, SUM(v.cantidadVotos) FROM Voto v JOIN v.candidato c WHERE v.elecciones.id = :eleccionId AND c.partido IS NOT NULL GROUP BY c.partido.id ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByPartido(@Param("eleccionId") Long eleccionId);

    @Query("SELECT c.partido.id, SUM(v.cantidadVotos) FROM Voto v JOIN v.candidato c WHERE v.elecciones.id = :eleccionId AND c.partido IS NOT NULL AND c.cargo.tipoCircunscripcion.id = :tipoCircunscripcionId GROUP BY c.partido.id ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByPartidoYTipoCircunscripcion(@Param("eleccionId") Long eleccionId, @Param("tipoCircunscripcionId") Long tipoCircunscripcionId);

    @Query("SELECT pr.id, pr.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia p JOIN p.canton c JOIN c.provincia pr WHERE v.elecciones.id = :eleccionId GROUP BY pr.id, pr.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByProvinciaAll(@Param("eleccionId") Long eleccionId);

    @Query("SELECT c.id, c.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia p JOIN p.canton c WHERE v.elecciones.id = :eleccionId GROUP BY c.id, c.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByCantonAll(@Param("eleccionId") Long eleccionId);

    @Query("SELECT p.id, p.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia p WHERE v.elecciones.id = :eleccionId GROUP BY p.id, p.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByParroquiaAll(@Param("eleccionId") Long eleccionId);

    @Query("SELECT c.id, c.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia p JOIN p.canton c WHERE v.elecciones.id = :eleccionId AND c.provincia.id = :provinciaId GROUP BY c.id, c.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByCantonInProvincia(@Param("eleccionId") Long eleccionId, @Param("provinciaId") Long provinciaId);

    @Query("SELECT par.id, par.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia par WHERE v.elecciones.id = :eleccionId AND par.canton.id = :cantonId GROUP BY par.id, par.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByParroquiaInCanton(@Param("eleccionId") Long eleccionId, @Param("cantonId") Long cantonId);

    @Query("SELECT c.id, c.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia p JOIN p.canton c WHERE v.candidato.id = :candidatoId AND v.elecciones.id = :eleccionId AND c.provincia.id = :provinciaId GROUP BY c.id, c.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByCantonPorCandidatoYProvincia(@Param("candidatoId") Long candidatoId, @Param("eleccionId") Long eleccionId, @Param("provinciaId") Long provinciaId);

    @Query("SELECT par.id, par.nombre, SUM(v.cantidadVotos) FROM Voto v JOIN v.mesa m JOIN m.institucion i JOIN i.parroquia par WHERE v.candidato.id = :candidatoId AND v.elecciones.id = :eleccionId AND par.canton.id = :cantonId GROUP BY par.id, par.nombre ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosByParroquiaPorCandidatoYCanton(@Param("candidatoId") Long candidatoId, @Param("eleccionId") Long eleccionId, @Param("cantonId") Long cantonId);

    @Query("SELECT v.listaId, SUM(v.cantidadVotos) FROM Voto v WHERE v.elecciones.id = :eleccionId AND v.listaId IS NOT NULL GROUP BY v.listaId ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosGroupByLista(@Param("eleccionId") Long eleccionId);

    @Query("SELECT v.listaId, SUM(v.cantidadVotos) FROM Voto v WHERE v.elecciones.id = :eleccionId AND v.mesa.id IN :mesaIds AND v.listaId IS NOT NULL GROUP BY v.listaId ORDER BY SUM(v.cantidadVotos) DESC")
    List<Object[]> sumVotosGroupByListaAndMesaIds(@Param("eleccionId") Long eleccionId, @Param("mesaIds") List<Long> mesaIds);
}
