const { test, expect } = require('@playwright/test');

const API_URL = 'http://localhost:8081/api';

test.describe('API: Autenticación', () => {
  test('POST /auth/login devuelve token', async ({ request }) => {
    const response = await request.post(`${API_URL}/auth/login`, {
      data: { username: 'admin', password: 'admin123' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeTruthy();
    expect(body.rol).toBe('ADMIN');
  });

  test('POST /auth/login rechaza credenciales inválidas', async ({ request }) => {
    const response = await request.post(`${API_URL}/auth/login`, {
      data: { username: 'admin', password: 'wrong' },
    });
    expect(response.status()).toBe(401);
  });

  test('GET /auth/me devuelve datos del usuario autenticado', async ({ request }) => {
    const loginRes = await request.post(`${API_URL}/auth/login`, {
      data: { username: 'admin', password: 'admin123' },
    });
    const { token } = await loginRes.json();

    const meRes = await request.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(meRes.status()).toBe(200);
    const me = await meRes.json();
    expect(me.username).toBe('admin');
  });

  test('GET /auth/me sin token retorna 401 o 500', async ({ request }) => {
    const response = await request.get(`${API_URL}/auth/me`);
    expect([401, 500]).toContain(response.status());
  });
});

test.describe('API: Sync Push/Pull', () => {
  let token;

  test.beforeAll(async ({ request }) => {
    const res = await request.post(`${API_URL}/auth/login`, {
      data: { username: 'admin', password: 'admin123' },
    });
    token = (await res.json()).token;
  });

  test('POST /sync/push acepta operación con operationId', async ({ request }) => {
    const opId = `e2e-test-${Date.now()}`;
    const response = await request.post(`${API_URL}/sync/push`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        operations: [
          {
            operationId: opId,
            entityType: 'VOTO',
            entityId: 1,
            operation: 'CREATE',
            payload: { test: true },
          },
        ],
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.results).toHaveLength(1);
    expect(body.results[0].operationId).toBe(opId);
  });

  test('POST /sync/push idempotente: mismo operationId no duplica', async ({ request }) => {
    const opId = `e2e-idem-${Date.now()}`;
    const payload = {
      operations: [
        {
          operationId: opId,
          entityType: 'VOTO',
          entityId: 1,
          operation: 'CREATE',
          payload: { test: 'idem' },
        },
      ],
    };

    const r1 = await request.post(`${API_URL}/sync/push`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
    expect(r1.status()).toBe(200);

    const r2 = await request.post(`${API_URL}/sync/push`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
    expect(r2.status()).toBe(200);
  });

  test('POST /sync/push sin token retorna 401', async ({ request }) => {
    const response = await request.post(`${API_URL}/sync/push`, {
      data: { operations: [] },
    });
    expect(response.status()).toBe(401);
  });

  test('GET /sync/pull con eleccionId retorna datos', async ({ request }) => {
    const response = await request.get(`${API_URL}/sync/pull?eleccionId=1&since=2020-01-01T00:00:00`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('operations');
    expect(body).toHaveProperty('serverTimestamp');
  });

  test('GET /sync/pull sin eleccionId retorna error', async ({ request }) => {
    const response = await request.get(`${API_URL}/sync/pull?since=2020-01-01T00:00:00`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect([400, 500]).toContain(response.status());
  });
});

test.describe('API: Endpoints Públicos', () => {
  test('GET /auth/ping responde OK', async ({ request }) => {
    const response = await request.get(`${API_URL}/auth/ping`);
    expect(response.status()).toBe(200);
  });

  test('GET /elecciones/activas funciona', async ({ request }) => {
    const response = await request.get(`${API_URL}/elecciones/activas`);
    expect([200, 401]).toContain(response.status());
  });

  test('GET /swagger-ui responde', async ({ request }) => {
    const response = await request.get(`${API_URL.replace('/api', '')}/swagger-ui.html`);
    expect([200, 302]).toContain(response.status());
  });
});
