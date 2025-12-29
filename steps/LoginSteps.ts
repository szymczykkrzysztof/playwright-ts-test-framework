import { Page, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export class LoginSteps {
  readonly page: Page;
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  async userLogsInWithUsernameAndPassword(username: string, password: string) {
    await this.loginPage.setUserName(username);
    await this.loginPage.setPassword(password);
    await this.loginPage.selectLoginButton();
  }

  async userChecksError(error: string) {
    expect(await this.loginPage.getErrorMessage()).toContain(error);
  }

  async usersNavigatedToLoginPage() {
    expect(await this.loginPage.isLoginButtonVisible()).toBeTruthy();
    await expect(this.page).toHaveURL(this.loginPage.pageUrl);
  }
}
