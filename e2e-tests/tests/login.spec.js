const { test, expect } = require('@playwright/test');
const { login, logout } = require('./helpers/auth');

test.describe('Login y Autenticación', () => {
  test('T01: La página de login carga correctamente', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Conteo Electoral' })).toBeVisible();
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('T02: Login con credenciales válidas redirige según rol ADMIN', async ({ page }) => {
    await login(page, 'admin', 'admin123');
    await expect(page).toHaveURL(/\/admin/);
    const token = await page.evaluate(() => localStorage.getItem('electoral_token'));
    expect(token).toBeTruthy();
  });

  test('T03: Login con credenciales inválidas muestra error', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'wrongpass');
    await page.click('button[type="submit"]');
    await expect(page.locator('.alert.alert-danger')).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('T04: Logout limpia el token y redirige a login', async ({ page }) => {
    await login(page);
    await logout(page);
    await page.goto('/dashboard');
    await page.waitForURL(/\/login/, { timeout: 15000 });
    await expect(page.locator('#username')).toBeVisible();
  });

  test('T05: Ruta protegida sin token redirige a login', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForURL(/\/login/, { timeout: 15000 });
    await expect(page.locator('#username')).toBeVisible();
  });
});
