const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

async function login(page, username = ADMIN_USER, password = ADMIN_PASS) {
  await page.goto('/login');
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/admin|\/dashboard|\/mesa/, { timeout: 15000 });
}

async function logout(page) {
  await page.evaluate(() => {
    localStorage.removeItem('electoral_token');
    localStorage.removeItem('electoral_user');
  });
}

async function setAuthToken(page) {
  const token = await page.evaluate(() => localStorage.getItem('electoral_token'));
  return token;
}

module.exports = { login, logout, setAuthToken, ADMIN_USER, ADMIN_PASS };
