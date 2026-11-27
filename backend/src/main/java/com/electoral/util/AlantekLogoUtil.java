package com.electoral.util;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

/** Logo institucional ALANTEK, compartido por los exportadores de reportes. */
public final class AlantekLogoUtil {

    private static final String RESOURCE = "branding/alantek-logo.png";
    private static byte[] logoBytes;

    private AlantekLogoUtil() {
    }

    public static byte[] logoBytes() {
        if (logoBytes == null) {
            logoBytes = load();
        }
        return logoBytes;
    }

    private static byte[] load() {
        try (InputStream in = AlantekLogoUtil.class.getClassLoader().getResourceAsStream(RESOURCE)) {
            if (in == null) {
                return new byte[0];
            }
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buffer = new byte[8192];
            int n;
            while ((n = in.read(buffer)) != -1) {
                out.write(buffer, 0, n);
            }
            return out.toByteArray();
        } catch (Exception e) {
            return new byte[0];
        }
    }
}
