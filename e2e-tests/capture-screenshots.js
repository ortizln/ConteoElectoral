const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE = process.env.E2E_BASE_URL || 'http://localhost:4200';
const OUT = path.join(__dirname, 'screenshots');

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Login (light)
  await page.goto(`${BASE}/login`);
  await page.waitForSelector('#username');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, '01-login-light.png') });

  // Login (dark) via system emulation
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, '02-login-dark.png') });
  await page.emulateMedia({ colorScheme: 'light' });

  // Login
  await page.fill('#username', 'admin');
  await page.fill('#password', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/admin|\/dashboard/, { timeout: 15000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT, '03-dashboard-light.png'), fullPage: false });

  // Dark mode toggle (boton theme-toggle)
  const toggle = page.locator('.theme-toggle');
  if (await toggle.count()) {
    await toggle.first().click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT, '04-dashboard-dark.png') });
    await toggle.first().click();
    await page.waitForTimeout(500);
  }

  // Admin page (zonas)
  await page.goto(`${BASE}/admin/zonas`);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT, '05-admin-zonas.png') });

  // Modulo votacion (mesa)
  await page.goto(`${BASE}/mesa`);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT, '06-mesa-votacion.png') });

  await browser.close();
  console.log('SCREENSHOTS_OK ->', OUT);
})().catch((e) => {
  console.error('SCREENSHOTS_FAIL', e.message);
  process.exit(1);
});
