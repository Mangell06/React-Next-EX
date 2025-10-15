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

    async writeInputRole(nameSend: string, text: string) {
        await this.page.getByRole('textbox', { name: nameSend }).fill(text);
    }

    async chooseSelectRole(nameSend: string, option: string) {
        await this.page.getByRole('combobox', { name: nameSend }).selectOption(option);
    }

    async selectCheckBox(nameSend: string) {
        await this.page.getByRole('radio', { name: nameSend }).check();
    }

    async clickLinkRole(nameSend: string) {
        const btn = await this.page.getByRole('link', { name: nameSend });
        if (btn) {
            const countbtns = await btn.count();
            if (countbtns > 1) {
                await btn.nth(0).click();
            } else { 
                await btn.click();
            }
        }
    }

    async clickButtonRole(nameSend: string) {
        await this.page.getByRole('button', { name: nameSend }).click();
    }

    async writeSpinbuttonRole(nameSend: string, numbers: string) {
        await this.page.getByRole('spinbutton', { name: nameSend }).fill(numbers);
    }

    async clickOneButtonofArray(nameSend: string, index: number){
        await this.page.getByRole('button', { name: nameSend }).nth(index-1).click();
    }

    async clickOneLinkofArray(nameSend: string, index: number){
        await this.page.getByRole('link', { name: nameSend }).nth(index-1).click();
    }

    async navigationRandom() { // Funcion para navegar aleatoriamente.
        const onethree = Math.floor(Math.random() * 3) + 1;
        const eightnine = Math.floor(Math.random() * 9) + 8;
        const onetwo = Math.floor(Math.random());
        if (onetwo == 0) {
            await this.clickLinkRole(onethree.toString());
        }else {
            await this.clickLinkRole(eightnine.toString());
        }
    }

    async clickOneEditsRandom(){ // Funcion para elegir a quien editar aleatoriamente.
        const edits = await this.page.getByRole('link', { name: "edit-btn" });
        const countedits = await edits.count();
        const randomEdit = Math.floor(Math.random() * countedits);
        await edits.nth(randomEdit).click();
    }

    async changeInvoiceStatus() { // Funcion para cambiar el estatus de la factura al contrario.
        const paid = await this.page.getByRole('radio', { name: 'Paid' });
        if (paid && await paid.isChecked()) {
            await this.selectCheckBox('Pending');
        } else {
            await this.selectCheckBox('Paid');
        }
    }

    async clickOneDeleteRandom(){ // Funcion para borrar aleatoriamente una factura.
        const delets = await this.page.getByRole('link', { name: "edit-btn" });
        const countDelets = await delets.count();
        const randomDelet = Math.floor(Math.random() * countDelets);
        await delets.nth(randomDelet).click();
    }

}