package com.electoral.util;

import com.electoral.entities.Usuario;
import com.electoral.repositories.UsuarioRepository;
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
        if (principal instanceof UserDetails) {
            return usuarioRepository.findByUsername(((UserDetails) principal).getUsername()).orElse(null);
        }
        return null;
    }

    public Long getCurrentUserId() {
        Usuario user = getCurrentUser();
        return user != null ? user.getId() : null;
    }
}
