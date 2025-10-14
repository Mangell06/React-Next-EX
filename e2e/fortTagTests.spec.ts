import { expect, test } from '@playwright/test';
import { Fixture } from './fixture';
import { chromium } from 'playwright';

let fixture : Fixture;

test.beforeAll(async () => {
    const browser = await chromium.launch();
    fixture = new Fixture(await browser.newPage());
    await fixture.goto();
    await fixture.buttonLinkClick("Log in");
    await fixture.setinputWriteLabel("Email", "user@nextmail.com");
    await fixture.setinputWriteLabel("Password", "123456");
    await fixture.buttonClick("Log in");
})

test.afterAll(async () => {
    await fixture.buttonClick("Sign Out");
})

test.describe('Search', () => {
    test('Search invoices of customers with m',async () => {
        await fixture.buttonLinkClick("Invoices");
        await fixture.setinputWriteLabel("Search","m");
    })
    test('Search invoices of customers with no',async () => {
        await fixture.setinputWriteLabel("Search","no");
    })
})