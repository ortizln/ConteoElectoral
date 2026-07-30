# Manual de Usuario — Sistema de Conteo Electoral

## Tabla de Contenidos

1. [Introducción](#1-introducción)
2. [Acceso al Sistema](#2-acceso-al-sistema)
3. [Módulo de Administración](#3-módulo-de-administración)
   - 3.1. Elecciones
   - 3.2. Tipos de Elección
   - 3.3. Cargos
   - 3.4. Partidos
   - 3.5. Candidatos
   - 3.6. Mesas Electorales
   - 3.7. Papeletas
   - 3.8. Listas Electorales
   - 3.9. Usuarios y Roles
   - 3.10. Zonas, Provincias, Cantones, Parroquias
   - 3.11. Instituciones Educativas
4. [Módulo de Votación — Web](#4-módulo-de-votación--web)
   - 4.1. Selección de Mesa
   - 4.2. Registro de Votos por Candidato
   - 4.3. Registro de Votos por Papeleta
   - 4.4. Votos Nulos y en Blanco
   - 4.5. Cierre de Acta
   - 4.6. Impresión de Acta
5. [Módulo de Votación — App Móvil](#5-módulo-de-votación--app-móvil)
   - 5.1. Instalación y Conexión
   - 5.2. Inicio de Sesión
   - 5.3. Selección de Mesa
   - 5.4. Registro de Votos
   - 5.5. Sincronización
   - 5.6. Cierre de Acta
6. [Dashboard y Resultados](#6-dashboard-y-resultados)
7. [Reportes](#7-reportes)
   - 7.1. Exportar a PDF
   - 7.2. Exportar a Excel
8. [Solución de Problemas](#8-solución-de-problemas)

---

## 1. Introducción

El **Sistema de Conteo Electoral** es una plataforma integral para la gestión y administración de procesos electorales. Permite configurar elecciones, registrar candidatos, asignar mesas de votación, registrar votos en tiempo real y generar reportes de resultados.

### Arquitectura General

- **Backend:** API REST en Java Spring Boot (puerto 8081)
- **Frontend Web:** Angular (puerto 4200)
- **App Móvil:** Flutter (Android/iOS)
- **Base de Datos:** PostgreSQL
- **Comunicación en Tiempo Real:** WebSockets

---

## 2. Acceso al Sistema

### Web

1. Abrir navegador en `http://localhost:4200`
2. Ingresar credenciales:
   - **Usuario:** admin
   - **Contraseña:** admin123
3. Presionar **Ingresar**

### App Móvil

1. Abrir la aplicación "Conteo Electoral"
2. Configurar la URL del servidor (ej. `http://192.168.100.215:8081`)
3. Ingresar las mismas credenciales del web
4. Presionar **Iniciar Sesión**

### Roles de Usuario

| Rol | Descripción |
|-----|-------------|
| ADMIN | Acceso completo a todos los módulos |
| MIEMBRO_MESA | Registro de votos en mesas asignadas |
| SUPERVISOR | Supervisión y reportes |

---

## 3. Módulo de Administración

### 3.1. Elecciones

**Ruta:** Menú → Elecciones

Permite crear y gestionar los procesos electorales.

**Campos:**
- **Nombre:** Identificador único de la elección
- **Descripción:** Detalle o propósito
- **Fecha Inicio / Fin:** Período de votación
- **Activa:** Marcar si la elección está vigente
- **Tipo de Elección:** Asociar un tipo (GENERALES, SECCIONALES)

**Acciones:**
- `+ Nueva Elección` — Crear una nueva
- Editar — Modificar datos
- Eliminar — Solo si no tiene votos registrados
- Exportar PDF / Excel

### 3.2. Tipos de Elección

**Ruta:** Menú → Tipos de Elección

Define las categorías de procesos electorales (Ej: Elecciones Generales, Seccionales).

**Funcionalidad:**
- CRUD de tipos
- Asignación de cargos a cada tipo de elección mediante el botón **Administrar Cargos**
- Cada tipo define qué cargos se elegirán y en qué orden aparecerán en la papeleta

### 3.3. Cargos

**Ruta:** Menú → Cargos

Define los puestos de elección popular (Ej: Prefecto, Alcalde, Concejal).

**Campos:**
- **Nombre:** Denominación del cargo
- **Descripción:** Detalle opcional
- **Tipo de Votación:** Individual, Lista, Plurinominal, Preferencial, Mixto
- **Circunscripción:** Nacional, Provincial, Cantonal, Parroquial, Urbana, Rural
- **Cant. Dignidades:** Número de dignidades a elegir
- **Max Candidatos/Lista:** Límite de candidatos por lista electoral

**Nota:** La circunscripción determina cómo se agrupan las papeletas geográficamente. Por ejemplo, "ALCALDE" con circunscripción PROVINCIAL genera una papeleta por cada provincia.

### 3.4. Partidos

**Ruta:** Menú → Partidos

Registro de organizaciones políticas participantes.

**Campos:**
- **Nombre:** Razón social del partido
- **Sigla:** Abreviatura (ej: "RC", "PSC")
- **Logo:** Imagen representativa
- **Elección:** A qué proceso electoral pertenece

### 3.5. Candidatos

**Ruta:** Menú → Candidatos

Registro de candidatos que participan en la elección.

**Campos:**
- **Nombres y Apellidos**
- **Partido:** Organización política a la que pertenece
- **Cargo:** Puesto al que aspira
- **Lista Electoral:** (opcional) Lista a la que pertenece (para votación por listas)
- **Foto:** Imagen del candidato
- **Tipo:** Principal o Suplente
- **Orden en Lista:** Posición dentro de la lista electoral

**Importante:** Para votación por LISTA, los candidatos deben estar asociados a una Lista Electoral. Para votación INDIVIDUAL, se asocian directamente al cargo.

### 3.6. Mesas Electorales

**Ruta:** Menú → Mesas

Configuración de las mesas de votación físicas.

**Campos:**
- **Número:** Identificador único de la mesa
- **Sexo:** HOMBRES, MUJERES o MIXTA
- **Institución:** Recinto electoral donde se ubica
- **Elección:** Proceso electoral asociado
- **Usuario:** Miembro de mesa asignado

**Asignación de Miembro de Mesa:** Cada mesa puede tener un usuario MIEMBRO_MESA asignado para que pueda registrar votos desde la app móvil.

**Estado:** Las mesas pueden estar ABIERTAS o CERRADAS. Una vez cerrada no se pueden modificar votos.

### 3.7. Papeletas

**Ruta:** Menú → Papeletas

Módulo para la generación y visualización de papeletas electorales.

**Proceso:**
1. Asegurarse de que la elección tenga un **Tipo de Elección** asignado
2. El tipo de elección debe tener **cargos configurados** con su respectiva circunscripción
3. Presionar **Generar Papeletas** — el sistema crea automáticamente las papeletas para cada cargo × circunscripción
4. Cada papeleta contiene opciones de voto basadas en las listas electorales o partidos registrados

**Visualización:** Muestra cada papeleta con su tipo de votación, circunscripción y opciones disponibles.

**Regenerar:** Si se modifican los cargos o listas, usar el botón **Regenerar** para recrear las papeletas desde cero.

### 3.8. Listas Electorales

**Ruta:** Menú → Listas Electorales

Agrupación de candidatos bajo una lista para votación por listas (sistema CNE).

**Campos:**
- **Nombre:** Identificador de la lista (ej: "Lista 1 - Alcaldía")
- **Partido:** Organización política
- **Elección:** Proceso electoral
- **Cargo:** Cargo al que aplica la lista
- **Número de Lista:** Número identificador en la papeleta
- **Circunscripción Tipo:** Nacional, Provincial, Cantonal, etc.
- **Circunscripción ID:** Provincia, cantón o parroquia específica

**Detalle:** Al seleccionar una lista, se muestran los candidatos asociados con sus respectivos roles (Principal/ Suplente) y orden.

### 3.9. Usuarios y Roles

**Ruta:** Menú → Usuarios (Solo ADMIN)

Administración de usuarios del sistema.

**Campos:**
- Username, Nombres, Email
- **Rol:** ADMIN, MIEMBRO_MESA, SUPERVISOR
- **Activo:** Habilitar/deshabilitar acceso

### 3.10. Zonas, Provincias, Cantones, Parroquias

**Ruta:** Menú → Zonas / Provincias / Cantones / Parroquias

Jerarquía geográfica utilizada para:
- Ubicar instituciones educativas (recintos)
- Asignar circunscripciones a cargos
- Filtrar resultados por ubicación

**Flujo:** Zona → Provincia → Cantón → Parroquia

### 3.11. Instituciones Educativas

**Ruta:** Menú → Instituciones

Registro de recintos electorales donde se instalan las mesas de votación.

**Campos:**
- Nombre, Dirección, Código
- **Parroquia:** Ubicación geográfica
- **Tipo:** Escuela, Colegio, etc.

---

## 4. Módulo de Votación — Web

### 4.1. Selección de Mesa

1. Ingresar al módulo **Votación** desde el menú
2. Seleccionar una mesa de la lista desplegable
3. El sistema muestra el nombre de la institución y el estado (ABIERTA/CERRADA)

### 4.2. Registro de Votos por Candidato

1. Seleccionar un candidato de la lista
2. Usar los botones `+` y `-` o escribir directamente la cantidad de votos
3. Presionar **Registrar**
4. El voto se agrega al listado de votos registrados

**Funcionalidades:**
- Filtrar por nombre, partido o cargo
- Ordenar por candidato, partido o cantidad de votos
- Editar la cantidad de votos de un candidato (se suma al existente)
- Eliminar un voto (requiere contraseña)

### 4.3. Registro de Votos por Papeleta

1. Ingresar al módulo **Votación por Papeleta** desde el menú
2. Seleccionar una mesa
3. Navegar entre las papeletas usando las pestañas superiores
4. Cada papeleta muestra:
   - **Título:** Cargo + Circunscripción (ej: "ALCALDE - PICHINCHA")
   - **Tipo de Votación:** LISTA, INDIVIDUAL, etc.
   - **Circunscripción:** NACIONAL, PROVINCIAL, etc.
5. Seleccionar una opción (lista o candidato)
6. Ingresar la cantidad de votos
7. Presionar **Registrar**

### 4.4. Votos Nulos y en Blanco

Al final de la tabla de votos (en votación tradicional) se encuentran dos filas especiales:

- **Votos Nulos** 🗳️ — Usar `+`/`-` para registrar votos nulos
- **Votos en Blanco** ⬜ — Usar `+`/`-` para registrar votos en blanco

Los cambios se guardan automáticamente después de una pausa de 400ms.

### 4.5. Cierre de Acta

1. Presionar el botón **Cerrar Mesa** o **Cerrar Acta**
2. Confirmar la acción en el diálogo
3. Una vez cerrada:
   - No se pueden modificar los votos
   - Se genera el acta de cierre automáticamente
   - El estado cambia a CERRADA

### 4.6. Impresión de Acta

- Presionar el botón **Imprimir Acta** para descargar el PDF oficial
- El PDF incluye: datos de la mesa, resultados detallados, votos nulos y en blanco, firmas

---

## 5. Módulo de Votación — App Móvil

### 5.1. Instalación y Conexión

1. Instalar el APK en el dispositivo Android
2. Al iniciar, configurar la URL del servidor:
   - **Opción por defecto:** `http://10.0.2.2:8081/api` (emulador)
   - **Producción:** `http://192.168.100.215:8081/api`
3. Presionar **Probar Conexión** para verificar

### 5.2. Inicio de Sesión

1. Ingresar username y contraseña
2. Presionar **Iniciar Sesión**
3. La app descarga automáticamente los datos de la elección activa

### 5.3. Selección de Mesa

1. En la pantalla de inicio, seleccionar la mesa asignada
2. La app muestra el número de mesa y la institución

### 5.4. Registro de Votos

1. La pantalla de votación muestra la lista de candidatos filtrables
2. Cada candidato muestra:
   - **Nombre completo**
   - **Partido y Cargo**
   - **Tipo de votación** y **Circunscripción** (badges)
3. Presionar un candidato para seleccionarlo
4. Ajustar la cantidad con `+`/`-` o escribir directamente
5. Presionar **Registrar**
6. El voto se guarda localmente (offline) y se sincroniza automáticamente

### 5.5. Sincronización

- **Automática:** Cuando hay conexión a internet, los votos se sincronizan inmediatamente
- **Manual:** Presionar el ícono de sincronización en la barra superior
- Los votos pendientes se muestran con un indicador

### 5.6. Cierre de Acta

1. Presionar **Cerrar**
2. Confirmar en el diálogo
3. La mesa se marca como cerrada y no se pueden modificar votos

---

## 6. Dashboard y Resultados

**Ruta:** Menú → Dashboard

Visualización de resultados en tiempo real.

**Indicadores principales:**
- **Total de Votos:** Suma de todos los votos registrados
- **Votos Nulos:** Total de votos nulos
- **Votos en Blanco:** Total de votos en blanco
- **Total Mesas:** Número de mesas configuradas
- **Mesas Cerradas:** Progreso del escrutinio
- **% Mesas Cerradas:** Porcentaje de avance

**Gráficos:**
- Resultados por candidato (barras)
- Resultados geográficos por provincia
- Resultados por parroquia

**Filtros:**
- Por cargo
- Por partido
- Por ubicación (zona, provincia, cantón, parroquia)

**Actualización:** Los datos se actualizan automáticamente vía WebSocket cuando se registran nuevos votos.

---

## 7. Reportes

### 7.1. Exportar a PDF

Disponible en los módulos:
- **Elecciones:** Listado completo de procesos
- **Cargos:** Listado de cargos por elección
- **Candidatos:** Detalle de candidatos
- **Acta de Mesa:** Resultados detallados por mesa

### 7.2. Exportar a Excel

Disponible en:
- **Elecciones:** Descarga masiva de datos
- **Cargos:** Plantilla de importación y exportación
- **Candidatos:** Listado para análisis
- **Votos:** Datos de votación para procesamiento externo

**Importación Masiva:**
1. Descargar la plantilla Excel desde el módulo correspondiente
2. Llenar los datos siguiendo el formato
3. Usar el botón **Importar desde Excel**
4. El sistema valida y procesa los datos

---

## 8. Solución de Problemas

### Error 500 al generar papeletas

**Causa:** Catálogos base vacíos o elección sin configuración completa.

**Solución:**
1. Verificar que `tipo_circunscripcion` tenga datos (NACIONAL, PROVINCIAL, etc.)
2. Verificar que `tipo_eleccion` tenga tipos registrados (GENERALES, SECCIONALES)
3. Asignar un Tipo de Elección a la elección activa
4. Configurar los cargos con Tipo de Votación y Circunscripción
5. Asociar los cargos al Tipo de Elección mediante "Administrar Cargos"
6. Regenerar las papeletas

### Error de conexión en app móvil

1. Verificar que el servidor esté corriendo
2. Verificar la URL configurada en la app
3. Verificar conectividad de red entre dispositivo y servidor
4. Probar conexión desde el botón "Probar Conexión"

### Votos no se sincronizan

1. Verificar conexión a internet
2. Presionar el botón de sincronización manual
3. Verificar que el token de sesión no haya expirado
4. Cerrar sesión y volver a iniciar

### Error al cerrar mesa

1. Asegurarse de que todos los votos estén registrados
2. Sincronizar votos pendientes primero
3. Intentar cerrar nuevamente
4. Si persiste, contactar al administrador

---

*Documento generado para el Sistema de Conteo Electoral v3.0*
