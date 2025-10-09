import { test, expect } from '@playwright/test';

test('Sign Up', async ({ page }) => {
  await page.goto("https://react-next-ex-tan.vercel.app/login");
  await page.getByLabel("Email").fill("user@nextmail.com");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole('button', { name: "Log in"}).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
});
