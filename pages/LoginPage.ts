import {Page, Locator} from "@playwright/test";

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    readonly pageUrl: RegExp;

    constructor(page: Page) {
        this.usernameInput = page.getByRole("textbox", {name: "username"});
        this.passwordInput = page.getByRole("textbox", {name: "password"});
        this.loginButton = page.getByRole("button", {name: "Login"});
        this.errorMessage = page.locator("data-test=error");
        this.pageUrl = new RegExp("/.*saucedemo.com.*/");
    }

    async setUserName(username: string) {
        await this.usernameInput.fill(username);
    }

    async setPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async selectLoginButton() {
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.allInnerTexts();
    }

    async isLoginButtonVisible():Promise<boolean>{
        return await this.loginButton.isVisible();
    }
}
