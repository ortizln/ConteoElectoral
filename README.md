# Sistema de Conteo Electoral

Aplicación web administrativa para gestión de procesos electorales con visualización de resultados en tiempo real.

## 🏗️ Arquitectura

- **Backend**: Spring Boot 3.2 + Java 17
- **Frontend**: Angular 17
- **Base de datos**: PostgreSQL
- **Tiempo real**: WebSockets (STOMP)
- **Autenticación**: JWT

---

## 📋 Requisitos Previos

- JDK 17+
- Node.js 18+
- PostgreSQL 14+
- Maven 3.8+

---

## 🐘 Paso 1: Base de Datos

### Crear base de datos
```bash
createdb conteo_electoral
```

### Ejecutar schema
```bash
psql -d conteo_electoral -f database/schema.sql
```

### Configuración (opcional)
Editar `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/conteo_electoral
    username: postgres
    password: tu_password
```

---

## ⚙️ Paso 2: Backend

### Compilar
```bash
cd backend
mvn clean package -DskipTests
```

### Ejecutar
```bash
java -jar target/conteo-electoral-1.0.0.jar
```

El servidor inicia en: `http://localhost:8080`

### Endpoints principales
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Autenticación |
| GET | `/api/elecciones` | Listar elecciones |
| GET | `/api/dashboard/eleccion/{id}` | Resultados en tiempo real |
| POST | `/api/votos` | Registrar voto |
| POST | `/api/mesas/{id}/cerrar` | Cerrar acta |

### Documentación API (Swagger)
```
http://localhost:8080/swagger-ui.html
```

---

## 🎨 Paso 3: Frontend

### Instalar dependencias
```bash
cd frontend
npm install
```

### Ejecutar en desarrollo
```bash
npm start
```

Aplicación disponible en: `http://localhost:4200`

### Build para producción
```bash
npm run build
```

Archivos generados en: `frontend/dist/conteo-electoral`

---

## 🔐 Roles de Usuario

| Rol | Descripción |
|-----|-------------|
| ADMIN | Acceso total al sistema |
| SUPERVISOR | Gestión electoral, no usuarios |
| MIEMBRO_MESA | Solo registra votos en su mesa |

---

## 🔌 WebSockets

Para actualizaciones en tiempo real:
```javascript
// Conectar
const socket = new SockJS('http://localhost:8080/ws');
const stompClient = Stomp.over(socket);

// Suscribirse a resultados
stompClient.subscribe('/topic/resultados/1', (message) => {
  const datos = JSON.parse(message.body);
  console.log(datos);
});
```

---

## 📁 Estructura del Proyecto

```
ConteoElectoral/
├── database/
│   └── schema.sql          # Schema PostgreSQL
├── backend/
│   ├── src/main/java/
│   │   └── com/electoral/
│   │       ├── entities/   # Entidades JPA
│   │       ├── services/   # Lógica de negocio
│   │       ├── controllers/# API REST
│   │       ├── config/     # Configuración
│   │       └── security/   # JWT
│   └── pom.xml
└── frontend/
    ├── src/app/
    │   ├── core/           # Servicios, guards
    │   └── features/       # Componentes
    └── package.json
```

---

## 🚀 Deploy en Producción

### Backend
```bash
# Construir
mvn clean package -DskipTests

# Ejecutar con variables de entorno
java -jar target/conteo-electoral-1.0.0.jar \
  --server.port=8080 \
  --spring.datasource.url=jdbc:postgresql://HOST:5432/conteo_electoral \
  --spring.datasource.username=USUARIO \
  --spring.datasource.password=PASSWORD \
  --jwt.secret=TU_SECRET_KEY
```

### Frontend (Nginx)
```bash
# Build
npm run build

# Copiar dist a nginx
cp -r dist/conteo-electoral/browser/* /var/www/html/

# Configurar nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8080;
    }
    
    location /ws {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## 📝 Notas

1. **JWT Secret**: La clave debe ser Base64 de al menos 256 bits
2. **Primera ejecución**: Crear usuario ADMIN manualmente via API o insert directo en BD
3. **CORS**: Configurado para `http://localhost:4200` (desarrollo)
4. **Prevención de fraude**: Mesas se cierran irrevocablemente

---

## 📄 Licencia

MIT License