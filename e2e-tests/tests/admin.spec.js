const { test, expect } = require('@playwright/test');
const { login } = require('./helpers/auth');

test.describe('Gestión de Elecciones', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('T06: Panel de administración carga correctamente', async ({ page }) => {
    await expect(page).toHaveURL(/\/admin/);
    await expect(page.locator('.sidebar, nav, app-admin-layout').first()).toBeVisible();
  });

  test('T07: Navegación a Elecciones muestra el listado', async ({ page }) => {
    await page.goto('/admin/elecciones');
    await expect(page).toHaveURL(/\/admin\/elecciones/);
    await expect(page.locator('h2, h1, .page-title').first()).toBeVisible({ timeout: 10000 });
  });

  test('T08: Navegación a Usuarios muestra el listado', async ({ page }) => {
    await page.goto('/admin/usuarios');
    await expect(page).toHaveURL(/\/admin\/usuarios/);
    await expect(page.locator('h2, h1, .page-title').first()).toBeVisible({ timeout: 10000 });
  });

  test('T09: Navegación a Mesas muestra el listado', async ({ page }) => {
    await page.goto('/admin/mesas');
    await expect(page).toHaveURL(/\/admin\/mesas/);
    await expect(page.locator('h2, h1, .page-title').first()).toBeVisible({ timeout: 10000 });
  });

  test('T10: Navegación a Partidos muestra el listado', async ({ page }) => {
    await page.goto('/admin/partidos');
    await expect(page).toHaveURL(/\/admin\/partidos/);
    await expect(page.locator('h2, h1, .page-title').first()).toBeVisible({ timeout: 10000 });
  });

  test('T11: Navegación a Candidatos muestra el listado', async ({ page }) => {
    await page.goto('/admin/candidatos');
    await expect(page).toHaveURL(/\/admin\/candidatos/);
    await expect(page.locator('h2, h1, .page-title').first()).toBeVisible({ timeout: 10000 });
  });

  test('T12: Navegación a Papeletas muestra el listado', async ({ page }) => {
    await page.goto('/admin/papeletas');
    await expect(page).toHaveURL(/\/admin\/papeletas/);
    await expect(page.locator('h2, h1, .page-title').first()).toBeVisible({ timeout: 10000 });
  });

  test('T13: Dashboard carga con datos', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('.dashboard, .stats, .cards, app-dashboard').first()).toBeVisible({ timeout: 10000 });
  });
});
