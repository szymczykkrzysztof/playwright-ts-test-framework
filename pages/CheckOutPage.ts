import { Page, Locator } from "@playwright/test";
export class CheckoutPage {
  private readonly page: Page;
  private readonly lastNameInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly checkoutHeader: Locator;
  private readonly zipPostalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton:Locator;
  private readonly itemTotalPrice: Locator;
  private readonly itemTotalPriceWithTax: Locator;
  private readonly checkoutOverviewHeader: Locator;
  private readonly checkoutCompleteHeader:Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutHeader = page.getByText("Checkout: Your Information");
    this.checkoutCompleteHeader= page.getByText("Checkout: Complete!");
    this.checkoutOverviewHeader = page.getByText("Checkout: Overview");
    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });
    this.zipPostalCodeInput = page.getByRole("textbox", {
      name: "Zip/Postal Code",
    });
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.itemTotalPrice = page.locator('[data-test="subtotal-label"]');
    this.itemTotalPriceWithTax = page.locator('[data-test="total-label"]')
    this.finishButton = page.getByRole("button",{name:"Finish"});
  }

  async getCheckoutTotals() {
    const itemTotalText = await this.itemTotalPrice.textContent();
    const totalText = await this.itemTotalPriceWithTax.textContent();

    return {
      itemTotal: itemTotalText?.replace("Item total: $", "").trim(),
      total: totalText?.replace("Total: $", "").trim(),
    };
  }

  async getCheckoutHeaderVisibility(): Promise<boolean> {
    return await this.checkoutHeader.isVisible();
  }

  async getCheckoutCompleteHeaderVisibility(): Promise<boolean> {
    return await this.checkoutCompleteHeader.isVisible();
  }

  async getCheckoutOverviewHeaderVisibility(): Promise<boolean> {
    return await this.checkoutOverviewHeader.isVisible();
  }

  async setFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async setLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async setZipPostalCode(postalCode: string) {
    await this.zipPostalCodeInput.fill(postalCode);
  }

  async selectContinueButton() {
    await this.continueButton.click();
  }

   async selectFinishButton() {
    await this.finishButton.click();
  }

  async itemExistInCheckoutList(productName: string): Promise<boolean> {
    return await this.page
      .locator('[data-test="inventory-item"]', {
        has: this.page.locator('[data-test="inventory-item-name"]', {
          hasText: productName,
        }),
      })
      .isVisible();
  }
}
