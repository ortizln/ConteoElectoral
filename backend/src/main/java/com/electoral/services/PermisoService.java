package com.electoral.services;

import com.electoral.dto.RolPermisoRequest;
import com.electoral.dto.RolPermisoResponse;
import com.electoral.entities.Rol;
import com.electoral.entities.RolPermiso;
import com.electoral.repositories.RolPermisoRepository;
import com.electoral.repositories.RolRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PermisoService {
    private final RolPermisoRepository rolPermisoRepository;
    private final RolRepository rolRepository;

    private RolPermisoResponse toResponse(RolPermiso p) {
        return RolPermisoResponse.builder()
                .id(p.getId())
                .rolId(p.getRol().getId())
                .rolNombre(p.getRol().getNombre())
                .modulo(p.getModulo())
                .puedeVer(p.isPuedeVer())
                .puedeCrear(p.isPuedeCrear())
                .puedeEditar(p.isPuedeEditar())
                .puedeEliminar(p.isPuedeEliminar())
                .build();
    }

    public List<RolPermisoResponse> getPermisosByRol(Long rolId) {
        return rolPermisoRepository.findByRolId(rolId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<RolPermisoResponse> getAllPermisos() {
        return rolPermisoRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public RolPermisoResponse updatePermiso(Long id, RolPermisoRequest request) {
        RolPermiso permiso = rolPermisoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Permiso no encontrado con id: " + id));
        permiso.setPuedeVer(request.isPuedeVer());
        permiso.setPuedeCrear(request.isPuedeCrear());
        permiso.setPuedeEditar(request.isPuedeEditar());
        permiso.setPuedeEliminar(request.isPuedeEliminar());
        return toResponse(rolPermisoRepository.save(permiso));
    }

    @Transactional
    public void initDefaultPermisos() {
        if (rolPermisoRepository.count() > 0) return;

        List<Rol> roles = rolRepository.findAll();
        String[] modulos = {
            "ELECCIONES", "ZONAS", "PROVINCIAS", "CANTONES", "PARROQUIAS",
            "INSTITUCIONES", "PARTIDOS", "CARGOS", "CANDIDATOS", "MESAS",
            "USUARIOS", "CONFIGURACION"
        };

        for (Rol rol : roles) {
            boolean isAdmin = "ADMIN".equals(rol.getNombre());
            boolean isSupervisor = "SUPERVISOR".equals(rol.getNombre());

            for (String modulo : modulos) {
                boolean puedeVer = isAdmin || isSupervisor;
                boolean puedeCrear = isAdmin;
                boolean puedeEditar = isAdmin;
                boolean puedeEliminar = isAdmin;

                // MIEMBRO_MESA solo ve modulos basicos
                if (!isAdmin && !isSupervisor) {
                    puedeVer = modulo.equals("ELECCIONES") || modulo.equals("MESAS");
                }

                rolPermisoRepository.save(RolPermiso.builder()
                        .rol(rol)
                        .modulo(modulo)
                        .puedeVer(puedeVer)
                        .puedeCrear(puedeCrear)
                        .puedeEditar(puedeEditar)
                        .puedeEliminar(puedeEliminar)
                        .build());
            }
        }
    }
}
