import type{Page, Locator} from '@playwright/test';

export class Fixture {
    private inputWrite: Locator | null;
    private selector: Locator | null;

    constructor(public readonly page: Page) {
        this.inputWrite = null;
        this.selector = null;
    }

    async goto() {
        await this.page.goto("https://react-next-ex-tan.vercel.app");
    }

    async setinputWrite(newTextLabel: string, text: string) {
        this.inputWrite = this.page.getByLabel(newTextLabel); 
        await this.inputWrite?.fill(text);
    }

    async setChooseSelector(newTextLabel: string, option: string) {
        this.selector = this.page.getByLabel(newTextLabel);
        await this.selector.selectOption(option);
    }

    async buttonLinkClick(newNameButton: string) {
        await this.page.getByRole('link',{name: newNameButton}).click();
    }

    async buttonClick(newNameButton: string) {
        await this.page.getByRole('button',{name: newNameButton}).click();
    }
    async buttonLabelClick(newTextLabel: string) {
        await this.page.getByLabel(newTextLabel).click();
    }
}