package com.electoral.controllers;

import com.electoral.dto.*;
import com.electoral.entities.Mesa;
import com.electoral.security.CustomUserDetails;
import com.electoral.services.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/mesas")
@RequiredArgsConstructor
public class MesaController {
    private final MesaService mesaService;
    private final VotoService votoService;
    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<List<MesaResponse>> getMesasByEleccion(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(mesaService.getMesasByEleccion(eleccionesId));
    }

    @GetMapping("/usuario/actual/eleccion/{eleccionesId}")
    public ResponseEntity<List<MesaResponse>> getMesasByCurrentUser(@PathVariable Long eleccionesId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        return ResponseEntity.ok(mesaService.getMesasByUsuario(userDetails.getId(), eleccionesId));
    }

    @GetMapping("/usuario/{usuarioId}/eleccion/{eleccionesId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<List<MesaResponse>> getMesasByUsuario(@PathVariable Long usuarioId, @PathVariable Long eleccionesId) {
        return ResponseEntity.ok(mesaService.getMesasByUsuario(usuarioId, eleccionesId));
    }

    @GetMapping("/institucion/{institucionId}")
    public ResponseEntity<List<MesaResponse>> getMesasByInstitucion(@PathVariable Long institucionId) {
        return ResponseEntity.ok(mesaService.getMesasByInstitucion(institucionId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MesaResponse> getMesaById(@PathVariable Long id) {
        return ResponseEntity.ok(mesaService.getMesaById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<MesaResponse> createMesa(@Valid @RequestBody MesaRequest request) {
        return ResponseEntity.ok(mesaService.createMesa(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<MesaResponse> updateMesa(@PathVariable Long id, @Valid @RequestBody MesaRequest request) {
        return ResponseEntity.ok(mesaService.updateMesa(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMesa(@PathVariable Long id) {
        mesaService.deleteMesa(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/cerrar")
    @PreAuthorize("hasRole('MIEMBRO_MESA') or hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<MesaResponse> cerrarMesa(@PathVariable Long id) {
        return ResponseEntity.ok(mesaService.cerrarMesa(id));
    }

    @PostMapping("/{mesaId}/asignar-usuario/{usuarioId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<Void> asignarUsuario(@PathVariable Long mesaId, @PathVariable Long usuarioId) {
        mesaService.asignarUsuario(mesaId, usuarioId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{mesaId}/asignar-usuario/{usuarioId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<Void> desasignarUsuario(@PathVariable Long mesaId, @PathVariable Long usuarioId) {
        mesaService.desasignarUsuario(mesaId, usuarioId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/exportar-excel")
    public ResponseEntity<byte[]> exportarExcel(@RequestParam(required = false) Long eleccionesId) {
        List<MesaResponse> mesas;
        if (eleccionesId != null) {
            mesas = mesaService.getMesasByEleccion(eleccionesId);
        } else {
            mesas = mesaService.getMesasByEleccion(null);
        }
        String[] headers = {"ID", "Numero", "Sexo", "Institucion", "Cerrada"};
        List<String[]> data = mesas.stream()
                .map(m -> new String[]{String.valueOf(m.getId()), m.getNumero(), m.getSexo(),
                        m.getInstitucionNombre(), m.getCerrada() ? "Si" : "No"})
                .collect(Collectors.toList());
        byte[] excel = excelExportService.exportExcel("Mesas", headers, data);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", "mesas.xlsx");
        return ResponseEntity.ok().headers(httpHeaders).body(excel);
    }

    @GetMapping("/exportar-pdf")
    public ResponseEntity<byte[]> exportarPdf(@RequestParam(required = false) Long eleccionesId) {
        List<MesaResponse> mesas;
        if (eleccionesId != null) {
            mesas = mesaService.getMesasByEleccion(eleccionesId);
        } else {
            mesas = mesaService.getMesasByEleccion(null);
        }
        String[] headers = {"ID", "Numero", "Sexo", "Institucion", "Cerrada"};
        List<String[]> data = mesas.stream()
                .map(m -> new String[]{String.valueOf(m.getId()), m.getNumero(), m.getSexo(),
                        m.getInstitucionNombre(), m.getCerrada() ? "Si" : "No"})
                .collect(Collectors.toList());
        byte[] pdf = pdfExportService.exportTablePdf("Mesas", headers, data, new float[]{1, 1, 1, 4, 1});
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData("attachment", "mesas.pdf");
        return ResponseEntity.ok().headers(httpHeaders).body(pdf);
    }

    @GetMapping("/{id}/exportar-acta")
    @PreAuthorize("hasRole('MIEMBRO_MESA') or hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<byte[]> exportarActa(@PathVariable Long id) {
        Mesa mesa = mesaService.getMesaEntityById(id);
        List<VotoResponse> votos = votoService.getVotosByMesa(id);
        Long totalVotos = votos.stream().mapToLong(VotoResponse::getCantidadVotos).sum();

        List<String[]> resultados = votos.stream()
                .map(v -> new String[]{v.getCandidatoNombre() + " " + v.getCandidatoApellido(),
                        v.getPartidoNombre(), " ", String.valueOf(v.getCantidadVotos())})
                .collect(Collectors.toList());

        String institucionNombre = mesa.getInstitucion().getNombre();
        String parroquiaNombre = mesa.getInstitucion().getParroquia().getNombre();
        String cantonNombre = mesa.getInstitucion().getParroquia().getCanton().getNombre();
        String provinciaNombre = mesa.getInstitucion().getParroquia().getCanton().getProvincia().getNombre();
        String zonaNombre = mesa.getInstitucion().getParroquia().getCanton().getProvincia().getZona().getNombre();
        String eleccionNombre = mesa.getElecciones().getNombre();

        byte[] pdf = pdfExportService.exportActaMesa(mesa, institucionNombre, parroquiaNombre,
                cantonNombre, provinciaNombre, zonaNombre, eleccionNombre,
                resultados, totalVotos, LocalDateTime.now());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData("attachment", "acta_mesa_" + mesa.getNumero() + ".pdf");
        return ResponseEntity.ok().headers(httpHeaders).body(pdf);
    }
}
