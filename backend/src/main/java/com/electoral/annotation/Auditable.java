package com.electoral.annotation;

import com.electoral.entities.Auditoria;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Auditable {
    String entidad();
    Auditoria.TipoAccion accion() default Auditoria.TipoAccion.CREATE;
    boolean autoAccion() default true;
}
