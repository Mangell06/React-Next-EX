import { test } from '@playwright/test';
import { chromium, firefox, devices } from 'playwright';
const { Fixture } = require('./fixture');

const email = process.env.USER_EMAIL!;
const password = process.env.PASSWORD!;
let fixture : typeof Fixture;

test.beforeAll(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext(devices['Desktop Chrome']);
    const page = await context.newPage();
    fixture = await new Fixture(page);
    await fixture.goto();
    await fixture.visibleText('Welcome to Acme. This is the');
    await fixture.clickLinkRole('Log in');
    await fixture.writeInputRole('Email',email);
    await fixture.writeInputRole('Password',password);
    await fixture.clickButtonRole('Log in');
    await fixture.waitChanges('**/dashboard');
})

test('Create Invoice', async () => {
  await fixture.clickLinkRole('Invoices');
  await fixture.waitChanges('**/invoices');
  await fixture.clickLinkRole('Create Invoice');
  await fixture.waitChanges('**/create');
  await fixture.chooseSelectRole('Choose customer','Balazs Orban');
  await fixture.writeSpinbuttonRole('Choose an amount','250');
  await fixture.selectCheckBox('Pending');
  await fixture.clickButtonRole('Create Invoice');
})

test('Edit Invoice', async () => {
    await fixture.clickLinkRole('Invoices');
    await fixture.waitChanges('**/invoices');
    await fixture.navigationRandom();
    await fixture.clickOneEditsRandom();
    await fixture.changeInvoiceStatus();
    await fixture.clickButtonRole('Edit Invoice');
    await fixture.clickLinkRole('Home');
    await fixture.waitChanges('**/dashboard');
})

test('Delete Invoice', async () => {
    await fixture.clickLinkRole('Invoices');
    await fixture.waitChanges('**/invoices');
    await fixture.navigationRandom();
    await fixture.clickOneDeleteRandom();
    await fixture.clickLinkRole('Home');
    await fixture.waitChanges('**/dashboard');
})
