import { test } from '@playwright/test';
import { chromium, firefox, devices } from 'playwright';
const { Fixture } = require('./fixture');

const email = process.env.USER_EMAIL!;
const password = process.env.PASSWORD!;

test.describe('Create Invoice Chromium', {tag:"@chromium"} ,() => {
  let fixture: typeof Fixture;

  test.beforeAll(async ()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext(devices['Desktop Chrome']);
    const page = await context.newPage();
    fixture = new Fixture(page);
    await fixture.goto();
    await fixture.buttonLinkClick("Log in");
  });

  test.afterAll(async () => {
    await fixture.page.locator('nav >> button').last().await page.goto('http://localhost:3000/');
    click();
  });

  test('Login',async () => {
    await fixture.setinputWriteRole("Email", email);
    await fixture.setinputWriteRole("Password", password);
    await fixture.buttonRoleClick("Log in");
  });

});

test.describe('Create Invoice FireFox', {tag:"@Firefox"} ,() => {
  let fixture: typeof Fixture;

  test.beforeAll(async ()=>{
    const browser = await firefox.launch();
    const context = await browser.newContext(devices['Desktop Firefox']);
    const page = await context.newPage();
    fixture = new Fixture(page);
    await fixture.goto();
    await fixture.buttonLinkClick("Log in");
  });

  test.afterAll(async () => {
    await fixture.buttonRoleClick("Sign Out");
  });

  test('Login',async () => {
    await fixture.setinputWriteRole("Email", email);
    await fixture.setinputWriteRole("Password", password);
    await fixture.buttonRoleClick("Log in");
  });

  test('Make the Creation',async () => {
    await fixture.buttonLinkClick("Invoices");
    await fixture.buttonLinkClick("Create Invoice");
    await fixture.setChooseSelector("Choose customer","Amy Burns");
    await fixture.setspinbuttonWriteRole("Choose an amount","20500");
    await fixture.checkBoxClick("Pending");
    await fixture.buttonRoleClick("Create Invoice");
  });

});

test.describe('Edit invoice Chromium',{tag:"@chromium"},() => {
  let fixture: typeof Fixture;

  test.beforeAll(async ()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext(devices['Desktop Chrome']);
    const page = await context.newPage();
    fixture = new Fixture(page);
    await fixture.goto();
    await fixture.buttonLinkClick("Log in");
  });

  test.afterAll(async () => {
    await fixture.buttonRoleClick("Sign Out");
  });

  test('Login',async () => {
    await fixture.setinputWriteRole("Email", email);
    await fixture.setinputWriteRole("Password", password);
    await fixture.buttonRoleClick("Log in");
  });

  test('Edit the Invoice',async () => {
    await fixture.buttonLinkClick("Invoices");
  });
});



