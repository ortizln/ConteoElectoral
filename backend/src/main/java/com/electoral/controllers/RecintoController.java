package com.electoral.controllers;

import com.electoral.entities.InstitucionEducativa;
import com.electoral.entities.Mesa;
import com.electoral.repositories.MesaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recintos")
@RequiredArgsConstructor
public class RecintoController {

    private final MesaRepository mesaRepository;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<List<Map<String, Object>>> getRecintosByEleccion(@PathVariable Long eleccionesId) {
        List<Mesa> mesas = mesaRepository.findByEleccionesId(eleccionesId);

        Map<Long, Map<String, Object>> recintoMap = new LinkedHashMap<>();

        for (Mesa mesa : mesas) {
            InstitucionEducativa inst = mesa.getInstitucion();
            if (inst == null) continue;

            Long instId = inst.getId();
            if (!recintoMap.containsKey(instId)) {
                Map<String, Object> r = new HashMap<>();
                r.put("id", instId);
                r.put("nombre", inst.getNombre());
                r.put("direccion", inst.getDireccion() != null ? inst.getDireccion() : "");
                r.put("institucionId", instId);
                r.put("institucionNombre", inst.getNombre());
                r.put("eleccionesId", eleccionesId);
                r.put("totalMesas", 0);

                if (inst.getParroquia() != null) {
                    r.put("parroquiaId", inst.getParroquia().getId());
                    r.put("parroquiaNombre", inst.getParroquia().getNombre());
                    if (inst.getParroquia().getCanton() != null) {
                        r.put("cantonId", inst.getParroquia().getCanton().getId());
                        r.put("cantonNombre", inst.getParroquia().getCanton().getNombre());
                        if (inst.getParroquia().getCanton().getProvincia() != null) {
                            r.put("provinciaId", inst.getParroquia().getCanton().getProvincia().getId());
                            r.put("provinciaNombre", inst.getParroquia().getCanton().getProvincia().getNombre());
                            if (inst.getParroquia().getCanton().getProvincia().getZona() != null) {
                                r.put("zonaId", inst.getParroquia().getCanton().getProvincia().getZona().getId());
                                r.put("zonaNombre", inst.getParroquia().getCanton().getProvincia().getZona().getNombre());
                            }
                        }
                    }
                }

                recintoMap.put(instId, r);
            }

            Map<String, Object> r = recintoMap.get(instId);
            r.put("totalMesas", ((Integer) r.get("totalMesas")) + 1);
        }

        return ResponseEntity.ok(new ArrayList<>(recintoMap.values()));
    }
}
