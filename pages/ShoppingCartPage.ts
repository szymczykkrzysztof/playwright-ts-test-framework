import { Locator, Page } from "@playwright/test";

export class ShoppingCartPage {
  readonly pageUrl: RegExp;
  private readonly page: Page;
  private readonly checkoutButton:Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageUrl = new RegExp(".*/cart.html$");
    this.checkoutButton = page.getByRole("button",{name:"Checkout"})
  }

  async itemExistInCartList(productName: string): Promise<boolean> {
    return await this.page
      .locator('[data-test="inventory-item"]', {
        has: this.page.locator('[data-test="inventory-item-name"]', {
          hasText: productName,
        }),
      })
      .isVisible();
  }

  async removeItemFromCartList(productName: string) {
    const product = this.page.locator('[data-test="inventory-item"]', {
      has: this.page.locator('[data-test="inventory-item-name"]', {
        hasText: productName,
      }),
    });

    await product.getByRole("button", { name: "Remove" }).click();
  }

  async clickCheckoutButton(){
    await this.checkoutButton.click();
  }
}
