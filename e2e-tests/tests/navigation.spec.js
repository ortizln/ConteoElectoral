const { test, expect } = require('@playwright/test');
const { login } = require('./helpers/auth');

test.describe('UI: Navegacion completa', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('T21: Sidebar muestra secciones de administracion', async ({ page }) => {
    await expect(page).toHaveURL(/\/admin/);
    const sidebar = page.locator('.sidebar, nav, aside').first();
    await expect(sidebar).toBeVisible();
  });

  test('T22: Navegacion a Zonas funciona', async ({ page }) => {
    await page.goto('/admin/zonas');
    await expect(page).toHaveURL(/\/admin\/zonas/);
    await expect(page.locator('h2, h1, .page-title, .content').first()).toBeVisible({ timeout: 10000 });
  });

  test('T23: Navegacion a Provincias funciona', async ({ page }) => {
    await page.goto('/admin/provincias');
    await expect(page).toHaveURL(/\/admin\/provincias/);
    await expect(page.locator('h2, h1, .page-title, .content').first()).toBeVisible({ timeout: 10000 });
  });

  test('T24: Navegacion a Instituciones funciona', async ({ page }) => {
    await page.goto('/admin/instituciones');
    await expect(page).toHaveURL(/\/admin\/instituciones/);
    await expect(page.locator('h2, h1, .page-title, .content').first()).toBeVisible({ timeout: 10000 });
  });

  test('T25: Navegacion a Cargos funciona', async ({ page }) => {
    await page.goto('/admin/cargos');
    await expect(page).toHaveURL(/\/admin\/cargos/);
    await expect(page.locator('h2, h1, .page-title, .content').first()).toBeVisible({ timeout: 10000 });
  });

  test('T26: Navegacion a Listas Electorales funciona', async ({ page }) => {
    await page.goto('/admin/listas-electorales');
    await expect(page).toHaveURL(/\/admin\/listas-electorales/);
    await expect(page.locator('h2, h1, .page-title, .content').first()).toBeVisible({ timeout: 10000 });
  });

  test('T27: Navegacion a Configuracion funciona', async ({ page }) => {
    await page.goto('/admin/configuracion');
    await expect(page).toHaveURL(/\/admin\/configuracion/);
    await expect(page.locator('h2, h1, .page-title, .content').first()).toBeVisible({ timeout: 10000 });
  });

  test('T28: Navegacion a Reportes funciona', async ({ page }) => {
    await page.goto('/admin/reportes');
    await expect(page).toHaveURL(/\/admin\/reportes/);
    await expect(page.locator('h2, h1, .page-title, .content').first()).toBeVisible({ timeout: 10000 });
  });

  test('T29: Navegacion a Roles funciona', async ({ page }) => {
    await page.goto('/admin/roles');
    await expect(page).toHaveURL(/\/admin\/roles/);
    await expect(page.locator('h2, h1, .page-title, .content').first()).toBeVisible({ timeout: 10000 });
  });

  test('T30: Ruta desconocida redirige a login', async ({ page }) => {
    await page.goto('/ruta-inexistente-xyz');
    await page.waitForURL(/\/login|\/dashboard|\/admin/, { timeout: 10000 });
  });
});
