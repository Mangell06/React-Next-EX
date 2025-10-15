import type{Page, Locator} from '@playwright/test';

export class Fixture {
    private inputWrite: Locator | null;
    private selector: Locator | null;

    constructor(public readonly page: Page) {
        this.inputWrite = null;
        this.selector = null;
    }

    async goto() {
        await this.page.goto("http://localhost:3000/");
    }

    async waitChanges(url: string) {
        await this.page.waitForURL(url);
    }

    async visibleText(text: string) {
        await this.page.getByText(text);
    }

    async clickLinkRole(nameSend: string) {
        await this.page.getByRole('link', { name: nameSend }).click();
    }

    async writeInputRole(nameSend: string, text: string) {
        await this.page.getByRole('textbox', { name: nameSend }).fill(text);
    }

    async clickButtonRole(nameSend: string) {
        await this.page.getByRole('button', { name: nameSend }).click();
    }

    async chooseSelectRole(nameSend: string, option: string) {
        await this.page.getByRole('combobox', { name: nameSend }).selectOption(option);
    }

    async writeSpinbuttonRole(nameSend: string, numbers: string) {
        await this.page.getByRole('spinbutton', { name: nameSend }).fill(numbers);
    }

    async selectCheckBox(nameSend: string) {
        await this.page.getByRole('radio', { name: nameSend }).check();
    }

    async clickOneButtonofArray(nameSend: string, index: number){
        await this.page.getByRole('button', { name: nameSend }).nth(index-1).click();
    }

}