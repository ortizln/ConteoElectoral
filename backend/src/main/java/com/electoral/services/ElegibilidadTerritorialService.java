package com.electoral.services;

import com.electoral.entities.*;
import com.electoral.exception.ValidacionException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Fuente unica de verdad para decidir si una candidatura (cargo + territorio) es elegible
 * en una mesa. La ubicacion SIEMPRE se resuelve desde las relaciones persistidas de la mesa:
 * mesa -> institucion -> parroquia -> canton -> provincia. Nunca se confia en valores
 * enviados por web/Flutter.
 *
 * Los cargos sujetos a la regla urbana/rural se identifican por el codigo estable de su
 * tipo de circunscripcion (URBANA/RURAL), no por el nombre visible del cargo.
 */
@Service
@RequiredArgsConstructor
public class ElegibilidadTerritorialService {

    /** Resultado con motivo legible para reportar inconsistencias al operador. */
    public record Resultado(boolean elegible, String motivo) {
        static Resultado ok() { return new Resultado(true, null); }
        static Resultado no(String motivo) { return new Resultado(false, motivo); }
    }

    public Resultado evaluarCandidato(Candidato candidato, Mesa mesa) {
        if (candidato == null || mesa == null) {
            return Resultado.no("Candidato o mesa inexistente");
        }
        if (candidato.getElecciones() == null || mesa.getElecciones() == null
                || !candidato.getElecciones().getId().equals(mesa.getElecciones().getId())) {
            return Resultado.no("La candidatura pertenece a otro proceso electoral");
        }
        Resultado r = evaluarCargo(candidato.getCargo(), mesa,
                candidato.getProvincia(), candidato.getCanton(), candidato.getParroquia(),
                candidato.getTipoCircunscripcion());
        if (!r.elegible()) return r;
        return Resultado.ok();
    }

    public boolean esCandidatoElegible(Candidato candidato, Mesa mesa) {
        return evaluarCandidato(candidato, mesa).elegible();
    }

    /** Segunda barrera: lanza 400 con el motivo cuando la seleccion no corresponde a la mesa. */
    public void exigirCandidatoElegible(Candidato candidato, Mesa mesa) {
        Resultado r = evaluarCandidato(candidato, mesa);
        if (!r.elegible()) throw new ValidacionException(r.motivo());
    }

    /** Para votos a lista (sin candidato individual): valida la contienda del cargo de la lista. */
    public void exigirCargoElegible(Cargo cargo, Mesa mesa) {
        if (cargo != null && cargo.getElecciones() != null && mesa.getElecciones() != null
                && !cargo.getElecciones().getId().equals(mesa.getElecciones().getId())) {
            throw new ValidacionException("La contienda pertenece a otro proceso electoral");
        }
        Resultado r = evaluarCargo(cargo, mesa, null, null, null, null);
        if (!r.elegible()) throw new ValidacionException(r.motivo());
    }

    /**
     * Si la eleccion contiene concejales sujetos a la regla especial y la parroquia de la mesa
     * no esta clasificada, bloquear y reportar la inconsistencia (no suponer que es urbana).
     */
    public void exigirClasificacionSiAplica(Mesa mesa, List<Candidato> candidatos) {
        boolean hayConcejal = candidatos.stream().anyMatch(c -> esSujetoAUrbanoRural(c.getCargo()));
        if (!hayConcejal) return;
        Parroquia parroquia = parroquiaDeMesa(mesa);
        if (parroquia == null) {
            throw new ValidacionException("La mesa no tiene parroquia resolvable; no se pueden consultar concejales");
        }
        if (parroquia.getTipoParroquia() == null) {
            throw new ValidacionException("La parroquia '" + parroquia.getNombre()
                    + "' esta pendiente de clasificacion urbana/rural");
        }
    }

    private Resultado evaluarCargo(Cargo cargo, Mesa mesa,
                                   Provincia provinciaCandidato, Canton cantonCandidato,
                                   Parroquia parroquiaCandidato, TipoCircunscripcion circCandidato) {
        if (cargo == null || cargo.getTerritorio() == null
                || cargo.getTerritorio() == TipoTerritorio.NACIONAL) {
            return Resultado.ok();
        }

        Parroquia parroquiaMesa = parroquiaDeMesa(mesa);
        Long parroquiaMesaId = parroquiaMesa != null ? parroquiaMesa.getId() : null;
        Long cantonMesaId = parroquiaMesa != null && parroquiaMesa.getCanton() != null
                ? parroquiaMesa.getCanton().getId() : null;
        Long provinciaMesaId = cantonMesaId != null && parroquiaMesa.getCanton().getProvincia() != null
                ? parroquiaMesa.getCanton().getProvincia().getId() : null;

        // Regla territorial existente (sin cambios para alcalde, prefecto, juntas, etc.)
        switch (cargo.getTerritorio()) {
            case PROVINCIA:
                if (provinciaCandidato != null && (provinciaMesaId == null
                        || !provinciaMesaId.equals(provinciaCandidato.getId()))) {
                    return Resultado.no("Provincia de la candidatura distinta de la de la mesa");
                }
                break;
            case CANTON:
                if (cantonCandidato != null && (cantonMesaId == null
                        || !cantonMesaId.equals(cantonCandidato.getId()))) {
                    return Resultado.no("Cantón de la candidatura distinto del de la mesa");
                }
                break;
            case PARROQUIA:
                if (parroquiaCandidato != null && (parroquiaMesaId == null
                        || !parroquiaMesaId.equals(parroquiaCandidato.getId()))) {
                    return Resultado.no("Parroquia de la candidatura distinta de la de la mesa");
                }
                break;
            default:
                break;
        }

        // Regla especial exclusively por el tipo de circunscripcion del CARGO (identificador estable)
        if (esSujetoAUrbanoRural(cargo)) {
            String codigo = cargo.getTipoCircunscripcion().getCodigo();
            if (parroquiaMesa == null || parroquiaMesa.getTipoParroquia() == null) {
                return Resultado.no("La parroquia de la mesa no tiene clasificación urbana/rural");
            }
            if (!codigo.equals(parroquiaMesa.getTipoParroquia().name())) {
                return Resultado.no("La parroquia es " + parroquiaMesa.getTipoParroquia()
                        + " y la contienda es " + codigo);
            }
            // Si la candidatura declara circunscripcion, debe ser coherente con el cargo.
            if (circCandidato != null && circCandidato.getCodigo() != null
                    && !codigo.equals(circCandidato.getCodigo())) {
                return Resultado.no("La circunscripción de la candidatura no coincide con la del cargo");
            }
        }
        return Resultado.ok();
    }

    public boolean esSujetoAUrbanoRural(Cargo cargo) {
        if (cargo == null || cargo.getTipoCircunscripcion() == null
                || cargo.getTipoCircunscripcion().getCodigo() == null) return false;
        String codigo = cargo.getTipoCircunscripcion().getCodigo();
        return "URBANA".equals(codigo) || "RURAL".equals(codigo);
    }

    private Parroquia parroquiaDeMesa(Mesa mesa) {
        if (mesa == null || mesa.getInstitucion() == null) return null;
        return mesa.getInstitucion().getParroquia();
    }
}
