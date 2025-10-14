import type{Page, Locator} from '@playwright/test';

export class Fixture {
    private inputWrite: Locator | null;
    private selector: Locator | null;

    constructor(public readonly page: Page) {
        this.inputWrite = null;
        this.selector = null;
    }

    async goto() {
        await this.page.goto("http://localhost:3000");
    }

    async setinputWriteRole(nameText: string, text: string) {
        this.inputWrite = await this.page.getByRole('textbox',{name : nameText}); 
        await this.inputWrite?.fill(text);
    }

    async setspinbuttonWriteRole(nameText: string, text: string) {
        this.inputWrite = await this.page.getByRole('spinbutton',{name : nameText}); 
        await this.inputWrite?.fill(text);
    }

    async setChooseSelector(newNameSelector: string, option: string) {
        this.selector = await this.page.getByRole('combobox',{name: newNameSelector});
        await this.selector.selectOption(option);
    }

    async buttonLinkClick(newNameButton: string) {
        await this.page.getByRole('link',{name: newNameButton}).click();
    }

    async buttonRoleClick(newNameButton: string) {
        await this.page.getByRole('button',{name: newNameButton}).click();
    }
    async checkBoxClick(newNameButton: string) {
        await this.page.getByRole('radio',{name: newNameButton}).click();
    }
}