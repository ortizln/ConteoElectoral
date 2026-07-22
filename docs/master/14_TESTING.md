# 14 — TESTING

> Estrategia y estándares de pruebas para el ERP Electoral.

---

## 1. PIRÁMIDE DE PRUEBAS

```
         ╱╲
        ╱  ╲          E2E (Cypress) — 5%
       ╱    ╲
      ╱────────╲      Integración (Testcontainers) — 15%
     ╱          ╲
    ╱──────────────╲  Unitarias (JUnit + Mockito) — 80%
```

---

## 2. PRUEBAS UNITARIAS (BACKEND)

### 2.1 Stack
| Herramienta | Uso |
|-------------|-----|
| JUnit 5 | Framework de pruebas |
| Mockito | Mocking de dependencias |
| AssertJ | Aserciones fluidas |
| JaCoCo | Cobertura de código |

### 2.2 Estructura de Clases de Prueba
```
src/test/java/com/electoral/
├── service/
│   ├── CandidatoServiceTest.java
│   └── EleccionServiceTest.java
├── controller/
│   ├── CandidatoControllerTest.java
│   └── EleccionControllerTest.java
├── repository/
│   └── CandidatoRepositoryTest.java
└── util/
    └── TestDataFactory.java
```

### 2.3 Ejemplo — Service Test
```java
@ExtendWith(MockitoExtension.class)
class CandidatoServiceTest {

    @Mock
    private CandidatoRepository candidatoRepository;

    @Mock
    private AuditoriaService auditoriaService;

    @InjectMocks
    private CandidatoService candidatoService;

    private Candidato candidato;
    private CandidatoRequest request;

    @BeforeEach
    void setUp() {
        candidato = new Candidato();
        candidato.setId(1L);
        candidato.setNombres("Juan");
        candidato.setApellidos("Pérez");
        candidato.setCedula("1234567890");

        request = new CandidatoRequest();
        request.setNombres("Juan");
        request.setApellidos("Pérez");
        request.setCedula("1234567890");
        request.setEleccionId(1L);
        request.setPartidoId(1L);
        request.setCargoId(1L);
    }

    @Test
    void testObtener_CuandoExiste_RetornaCandidato() {
        when(candidatoRepository.findById(1L)).thenReturn(Optional.of(candidato));

        CandidatoResponse response = candidatoService.obtener(1L);

        assertThat(response.getNombres()).isEqualTo("Juan");
        assertThat(response.getApellidos()).isEqualTo("Pérez");
        verify(candidatoRepository).findById(1L);
    }

    @Test
    void testObtener_CuandoNoExiste_LanzaExcepcion() {
        when(candidatoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            candidatoService.obtener(99L);
        });
    }

    @Test
    void testCrear_CuandoRequestValido_RetornaCandidato() {
        when(candidatoRepository.save(any(Candidato.class))).thenReturn(candidato);

        CandidatoResponse response = candidatoService.crear(request);

        assertThat(response.getNombres()).isEqualTo("Juan");
        verify(auditoriaService).registrar(eq("CANDIDATOS"), eq("CREATE"), anyLong(), isNull(), anyString());
    }
}
```

### 2.4 Ejemplo — Controller Test
```java
@WebMvcTest(CandidatoController.class)
class CandidatoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CandidatoService candidatoService;

    @Test
    void testListar_RetornaPagina() throws Exception {
        Page<CandidatoResponse> page = new PageImpl<>(List.of(createResponse()));
        when(candidatoService.listar(anyLong(), any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/candidatos")
                .param("eleccionId", "1")
                .header("Authorization", "Bearer test-token"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content").isArray())
            .andExpect(jsonPath("$.content[0].nombres").value("Juan"));
    }

    @Test
    void testCrear_CuandoRequestValido_Retorna201() throws Exception {
        when(candidatoService.crear(any(CandidatoRequest.class))).thenReturn(createResponse());

        mockMvc.perform(post("/api/candidatos")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer test-token")
                .content("{\"nombres\":\"Juan\",\"apellidos\":\"Pérez\",\"cedula\":\"1234567890\"}"))
            .andExpect(status().isCreated());
    }
}
```

---

## 3. PRUEBAS DE INTEGRACIÓN (BACKEND)

### 3.1 Stack
| Herramienta | Uso |
|-------------|-----|
| Testcontainers | PostgreSQL en contenedor |
| Spring Boot Test | @SpringBootTest, @DataJpaTest |
| REST Assured | Pruebas de API |

### 3.2 Ejemplo — Repository Test
```java
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(TestcontainersConfig.class)
class CandidatoRepositoryTest {

    @Autowired
    private CandidatoRepository candidatoRepository;

    @Autowired
    private EleccionRepository eleccionRepository;

    private Eleccion eleccion;

    @BeforeEach
    void setUp() {
        eleccion = new Eleccion();
        eleccion.setNombre("Elección Test");
        eleccion.setFecha(LocalDate.now());
        eleccion = eleccionRepository.save(eleccion);
    }

    @Test
    void testFindByEleccionId_RetornaCandidatos() {
        Candidato candidato = new Candidato();
        candidato.setNombres("Test");
        candidato.setApellidos("User");
        candidato.setEleccion(eleccion);
        candidatoRepository.save(candidato);

        List<Candidato> result = candidatoRepository.findByEleccionId(eleccion.getId());

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getNombres()).isEqualTo("Test");
    }
}
```

### 3.3 Configuración Testcontainers
```java
@TestConfiguration
public class TestcontainersConfig {

    @Bean
    @ServiceConnection
    PostgreSQLContainer<?> postgresContainer() {
        return new PostgreSQLContainer<>("postgres:18")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");
    }
}
```

---

## 4. PRUEBAS EN FRONTEND (ANGULAR)

### 4.1 Stack
| Herramienta | Uso |
|-------------|-----|
| Jasmine | Framework de pruebas |
| Karma | Test runner |
| Cypress | E2E tests |
| Angular Testing Library | Pruebas de componentes |

### 4.2 Ejemplo — Service Test
```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CandidatoService } from './candidato.service';

describe('CandidatoService', () => {
  let service: CandidatoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CandidatoService]
    });
    service = TestBed.inject(CandidatoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debería listar candidatos', () => {
    const mockResponse = {
      content: [{ id: 1, nombres: 'Juan', apellidos: 'Pérez' }],
      totalElements: 1
    };

    service.listar(0, 20).subscribe(response => {
      expect(response.content.length).toBe(1);
      expect(response.content[0].nombres).toBe('Juan');
    });

    const req = httpMock.expectOne(req => req.url.includes('/candidatos'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
```

### 4.3 Ejemplo — Component Test
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidatosComponent } from './candidatos.component';

describe('CandidatosComponent', () => {
  let component: CandidatosComponent;
  let fixture: ComponentFixture<CandidatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatosComponent],
      providers: [CandidatoService]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar la tabla de candidatos', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('table')).toBeTruthy();
  });
});
```

---

## 5. PRUEBAS EN FLUTTER

### 5.1 Stack
| Herramienta | Uso |
|-------------|-----|
| flutter_test | Framework de pruebas unitarias |
| integration_test | Pruebas de integración |
| mocktail | Mocking |

### 5.2 Ejemplo — Model Test
```dart
void main() {
  group('Candidato Model', () {
    test('fromJson debería crear modelo correcto', () {
      final json = {
        'id': 1,
        'eleccionId': 1,
        'partidoId': 1,
        'cargoId': 1,
        'nombres': 'Juan',
        'apellidos': 'Pérez',
        'cedula': '1234567890',
        'tipo': 'PRINCIPAL',
      };

      final candidato = Candidato.fromJson(json);

      expect(candidato.nombreCompleto, 'Juan Pérez');
      expect(candidato.tipo, 'PRINCIPAL');
    });

    test('toMap debería producir mapa correcto para SQLite', () {
      final candidato = Candidato(
        id: 1, eleccionId: 1, partidoId: 1, cargoId: 1,
        nombres: 'Test', apellidos: 'User',
      );

      final map = candidato.toMap();

      expect(map['nombres'], 'Test');
      expect(map['apellidos'], 'User');
      expect(map['activo'], 1);
    });
  });
}
```

---

## 6. ESTRATEGIA DE COBERTURA

### Objetivos
| Nivel | Cobertura Mínima |
|-------|-----------------|
| Unitarias (Service) | 90% |
| Unitarias (Controller) | 85% |
| Integración (Repository) | 70% |
| Frontend (Componentes) | 80% |
| Frontend (Servicios) | 90% |
| Flutter (Modelos + Providers) | 85% |

### Configuración JaCoCo
```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.11</version>
    <executions>
        <execution>
            <goals><goal>prepare-agent</goal></goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>verify</phase>
            <goals><goal>report</goal></goals>
        </execution>
    </executions>
</plugin>
```

---

## 7. PRUEBAS DE CARGA

### Escenarios a Probar
| Escenario | Usuarios Concurrentes | Objetivo |
|-----------|----------------------|----------|
| Login masivo | 1000 | < 1s por autenticación |
| Consulta dashboard | 500 | < 3s carga completa |
| Registro de votos | 200 | < 500ms por voto |
| Sincronización móvil | 100 | < 5s sincronización completa |

### Herramientas
- **k6** para pruebas de carga de API
- **Lighthouse** para rendimiento frontend
- **Profile en Flutter** para rendimiento móvil

---

## 8. COMMANDOS DE PRUEBA

```bash
# Backend — pruebas unitarias
cd backend
mvn test

# Backend — pruebas con cobertura
mvn verify

# Backend — pruebas de integración
mvn test -Dtest="*IntegrationTest"

# Frontend — pruebas unitarias
cd frontend
ng test

# Frontend — E2E
npx cypress run

# Flutter — pruebas unitarias
cd conteo_electoral_app
flutter test

# Flutter — pruebas de integración
flutter test integration_test/
```
