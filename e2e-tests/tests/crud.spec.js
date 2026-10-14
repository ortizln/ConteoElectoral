const { test, expect } = require('@playwright/test');

const API_URL = 'http://localhost:8081/api';
let token;
let eleccionId;

test.beforeAll(async ({ request }) => {
  const res = await request.post(`${API_URL}/auth/login`, {
    data: { username: 'admin', password: 'admin123' },
  });
  token = (await res.json()).token;
});

test.describe('CRUD: Ciclo completo de datos', () => {
  test('T14: Crear eleccion', async ({ request }) => {
    const response = await request.post(`${API_URL}/elecciones`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        nombre: `E2E Eleccion ${Date.now()}`,
        descripcion: 'Eleccion de prueba E2E',
        fechaInicio: '2026-10-01T08:00:00',
        fechaFin: '2026-10-01T18:00:00',
        activa: false,
      },
    });
    expect([200, 201]).toContain(response.status());
    const body = await response.json();
    expect(body.id).toBeTruthy();
    eleccionId = body.id;
  });

  test('T15: Listar elecciones', async ({ request }) => {
    const response = await request.get(`${API_URL}/elecciones`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('T16: Crear y eliminar partido', async ({ request }) => {
    const createRes = await request.post(`${API_URL}/partidos`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { nombre: `E2E Partido ${Date.now()}`, sigla: 'E2E', eleccionesId: eleccionId },
    });
    expect([200, 201]).toContain(createRes.status());
    const partido = await createRes.json();

    const deleteRes = await request.delete(`${API_URL}/partidos/${partido.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect([200, 204]).toContain(deleteRes.status());
  });

  test('T17: Listar usuarios', async ({ request }) => {
    const response = await request.get(`${API_URL}/usuarios`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('T18: Listar mesas por eleccion', async ({ request }) => {
    const response = await request.get(`${API_URL}/mesas/eleccion/${eleccionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect([200, 404]).toContain(response.status());
  });

  test('T19: Dashboard retorna resultados', async ({ request }) => {
    const response = await request.get(`${API_URL}/dashboard/eleccion/${eleccionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);
  });

  test('T20: Reglas de negocio listan modulos', async ({ request }) => {
    const response = await request.get(`${API_URL}/reglas-negocio/modulos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect([200, 404]).toContain(response.status());
  });

  test('T21: Obtener eleccion por ID', async ({ request }) => {
    const response = await request.get(`${API_URL}/elecciones/${eleccionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(eleccionId);
    expect(body.nombre).toContain('E2E');
  });

  test('T22: Actualizar eleccion', async ({ request }) => {
    const response = await request.put(`${API_URL}/elecciones/${eleccionId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        nombre: `E2E Eleccion Updated ${Date.now()}`,
        descripcion: 'Actualizada',
        fechaInicio: '2026-10-01T08:00:00',
        fechaFin: '2026-10-01T20:00:00',
        activa: true,
      },
    });
    expect([200, 201]).toContain(response.status());
    const body = await response.json();
    expect(body.nombre).toContain('Updated');
  });

  test('T23: Eliminar eleccion', async ({ request }) => {
    const response = await request.delete(`${API_URL}/elecciones/${eleccionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect([200, 204]).toContain(response.status());
  });
});
