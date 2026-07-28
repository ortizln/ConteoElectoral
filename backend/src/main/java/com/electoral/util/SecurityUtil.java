package com.electoral.util;

import com.electoral.entities.Usuario;
import com.electoral.repositories.UsuarioRepository;
import com.electoral.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtil {
    private final UsuarioRepository usuarioRepository;

    public Usuario getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return null;
        Object principal = auth.getPrincipal();
        if (principal instanceof CustomUserDetails cud) {
            return usuarioRepository.findById(cud.getId()).orElse(null);
        }
        if (principal instanceof UserDetails) {
            return usuarioRepository.findByUsername(((UserDetails) principal).getUsername()).orElse(null);
        }
        return null;
    }

    public Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return null;
        Object principal = auth.getPrincipal();
        if (principal instanceof CustomUserDetails cud) {
            return cud.getId();
        }
        Usuario user = getCurrentUser();
        return user != null ? user.getId() : null;
    }
}
