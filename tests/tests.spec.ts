import { test } from '@playwright/test';
const { firefox } = require('playwright');
const { Fixture } = require('./fixture');

test.describe('Log in', () => {
  let fixture: typeof Fixture;
    test.beforeAll(async () => {
    const browser = await firefox.launch();
    const page = await browser.newPage();
    fixture = new Fixture(page);
    await fixture.goto();
    await fixture.buttonLinkClick("Log in");
    })

    test.afterAll(async () => {
      await fixture.buttonClick("Sign Out");
    })

    test("Log In Credentials",async () => {
      await fixture.setinputWrite("Email", "user@nextmail.com");
      await fixture.setinputWrite("Password", "123456");
      await fixture.buttonClick("Log in");
    })
    test("Create Invoice",async() => {
      await fixture.buttonLinkClick("Invoices");
      await fixture.buttonLinkClick("Create Invoice");
      await fixture.setChooseSelector("Choose customer","Amy Burns");
      await fixture.setinputWrite("Choose an amount","20500");
      await fixture.buttonLabelClick("Pending");
      await fixture.buttonClick("Create invoice");
    })
  });

  

[{username: "user@nextmail.com",password:"123456"},
  {username: "raul2023@gmail.com",password:"123456"}].forEach(({username, password}) => {
  test('test log in with ' + username, async ({ page }) => {
    await page.goto("https://react-next-ex-tan.vercel.app/login");
    await page.getByLabel("Email").fill(username);
    await page.getByLabel("Password").fill(password);
    await page.getByRole('button', { name: "Log in"}).click();
    await page.getByRole('button', { name: 'Sign Out' }).click();
  });
});
