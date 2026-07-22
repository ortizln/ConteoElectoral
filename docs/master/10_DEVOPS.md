# 10 — DEVOPS

> DevOps, despliegue, CI/CD y administración del ERP Electoral.

---

## 1. INFRAESTRUCTURA ACTUAL

```
Servidor: 192.168.100.215
├── PostgreSQL 18 (puerto 5432)
│   └── Base de datos: conteo_electoral
└── Backend Spring Boot (puerto 8081)
    └── Servicio: conteo-electoral.jar

Entorno de desarrollo:
├── Backend: localhost:8081
├── Frontend: localhost:4200 (ng serve)
└── Base de datos: 192.168.100.215:5432
```

### Credenciales de Base de Datos
```properties
spring.datasource.url=jdbc:postgresql://192.168.100.215:5432/conteo_electoral
spring.datasource.username=postgres
spring.datasource.password=086411421
```

---

## 2. CONFIGURACIÓN DE AMBIENTES

### 2.1 Backend — application.properties
```properties
# Aplicación
spring.application.name=conteo-electoral
server.port=8081

# Base de datos
spring.datasource.url=jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:conteo_electoral}
spring.datasource.username=${DB_USER:postgres}
spring.datasource.password=${DB_PASSWORD:postgres}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JWT
jwt.secret=${JWT_SECRET:aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQo=}
jwt.expiration=${JWT_EXPIRATION:86400000}

# Multipart (para upload de imágenes)
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# Logging
logging.level.com.electoral=DEBUG
logging.file.name=logs/conteo-electoral.log
logging.pattern.file=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n
```

### 2.2 Backend — application-prod.properties
```properties
# Producción
spring.jpa.hibernate.ddl-auto=validate  # ¡NUNCA update en producción!
spring.jpa.show-sql=false
logging.level.com.electoral=INFO
server.servlet.context-path=/
```

### 2.3 Frontend — environment.prod.ts
```typescript
export const environment = {
  production: true,
  apiUrl: 'http://192.168.100.215:8081/api',
  wsUrl: 'http://192.168.100.215:8081/ws',
  appName: 'ERP Electoral',
  version: '1.0.0'
};
```

---

## 3. DOCKER (FUTURO)

### 3.1 Dockerfile — Backend
```dockerfile
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/conteo-electoral-*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 3.2 Dockerfile — Frontend
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/conteo-electoral /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3.3 docker-compose.yml
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:18
    environment:
      POSTGRES_DB: conteo_electoral
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s

  backend:
    build: ./backend
    ports:
      - "8081:8081"
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: conteo_electoral
      DB_USER: postgres
      DB_PASSWORD: ${DB_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      postgres:
        condition: service_healthy

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## 4. CI/CD (FUTURO — GITHUB ACTIONS)

### 4.1 Workflow — Build and Test
```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:18
        env:
          POSTGRES_DB: conteo_electoral_test
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Build Backend
        run: cd backend && mvn clean package
      - name: Run Tests
        run: cd backend && mvn test
        env:
          DB_HOST: localhost
          DB_PORT: 5432
          DB_PASSWORD: postgres

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install Dependencies
        run: cd frontend && npm ci
      - name: Build
        run: cd frontend && npm run build --prod
      - name: Lint
        run: cd frontend && npm run lint
```

### 4.2 Workflow — Deploy
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build and Deploy Backend
        run: |
          cd backend
          mvn clean package -DskipTests
          scp target/conteo-electoral.jar user@server:/opt/electoral/
          ssh user@server 'sudo systemctl restart conteo-electoral'
      - name: Build and Deploy Frontend
        run: |
          cd frontend
          npm ci && npm run build --prod
          scp -r dist/conteo-electoral/* user@server:/var/www/electoral/
```

---

## 5. NGINX CONFIGURACIÓN (PRODUCCIÓN)

### nginx.conf
```nginx
server {
    listen 80;
    server_name electoral.local;
    
    # Frontend
    location / {
        root /var/www/electoral;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket
    location /ws/ {
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }

    # Recursos estáticos (imágenes, manual PDF)
    location /uploads/ {
        alias /opt/electoral/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

---

## 6. COMANDOS DE ADMINISTRACIÓN

### 6.1 Backend
```bash
# Iniciar en desarrollo
cd backend
mvn spring-boot:run

# Empaquetar
mvn clean package -DskipTests

# Ejecutar JAR
java -jar target/conteo-electoral-1.0.0.jar

# Ejecutar con perfil de producción
java -jar target/conteo-electoral-1.0.0.jar --spring.profiles.active=prod

# Ejecutar con variables de entorno
DB_PASSWORD=secret java -jar target/conteo-electoral-1.0.0.jar
```

### 6.2 Frontend
```bash
# Desarrollo
cd frontend
ng serve --open

# Build producción
ng build --configuration production

# Servir build (con http-server)
npx http-server dist/conteo-electoral -p 80
```

### 6.3 Móvil
```bash
# Debug APK
cd conteo_electoral_app
flutter build apk --debug

# Release APK
flutter build apk --release

# Bundle (Play Store)
flutter build appbundle

# Web (para pruebas)
flutter build web
```

### 6.4 Base de Datos
```bash
# Backup
pg_dump -h 192.168.100.215 -U postgres conteo_electoral > backup_$(date +%Y%m%d).sql

# Restore
psql -h 192.168.100.215 -U postgres conteo_electoral < backup.sql

# Conectar
psql -h 192.168.100.215 -U postgres -d conteo_electoral
```

### 6.5 Servicio Systemd (Linux)
```ini
[Unit]
Description=ERP Electoral Backend
After=network.target postgresql.service

[Service]
Type=simple
User=electoral
WorkingDirectory=/opt/electoral
ExecStart=/usr/bin/java -jar /opt/electoral/conteo-electoral.jar
Environment=DB_PASSWORD=secret
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

---

## 7. MONITOREO (RECOMENDADO)

### Tecnologías Propuestas
| Herramienta | Uso |
|------------|-----|
| Prometheus | Métricas del backend (Spring Actuator) |
| Grafana | Dashboards de monitoreo |
| ELK Stack | Logs centralizados |
| Uptime Kuma | Monitoreo de disponibilidad |

### Spring Actuator (configuración)
```properties
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always
management.metrics.export.prometheus.enabled=true
```

---

## 8. BACKUP Y RECUPERACIÓN

### Política de Backup
| Tipo | Frecuencia | Retención |
|------|-----------|-----------|
| Backup completo BD | Diario | 30 días |
| Backup completo BD | Semanal | 6 meses |
| Backup lógico (SQL) | Diario | 7 días |
| Logs | Diario | 90 días |
| Uploads (imágenes, APK) | Mensual | 12 meses |

### Script de Backup
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/electoral"
DB_NAME="conteo_electoral"
DB_USER="postgres"

# Backup PostgreSQL
pg_dump -h localhost -U $DB_USER $DB_NAME | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Backup uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /opt/electoral/uploads

# Limpiar backups antiguos (30 días)
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +30 -delete
find $BACKUP_DIR -name "uploads_*.tar.gz" -mtime +30 -delete
```
