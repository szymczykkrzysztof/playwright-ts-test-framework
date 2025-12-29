import { Page, Locator, expect } from "@playwright/test";
export class InventoryPage {
  private readonly page: Page;
  private readonly shoppingCartLink: Locator;
  private readonly menuHamburgerIcon: Locator;
  private readonly productSortSelect: Locator;
  private readonly productNameLabel: Locator;
  private readonly productPriceLabel: Locator;
  private menuItem!: Locator;
  readonly pageUrl: RegExp;

  constructor(page: Page) {
    this.page = page;
    this.pageUrl = new RegExp(".*/inventory.html$");
    this.shoppingCartLink = page.locator("[data-test='shopping-cart-link']");
    this.menuHamburgerIcon = page.getByRole("button", { name: "Open Menu" });
    this.productSortSelect = page.locator(
      "[data-test='product-sort-container']"
    );
    this.productNameLabel = page.locator("[data-test='inventory-item-name']");
    this.productPriceLabel = page.locator("[data-test='inventory-item-price']");
  }

  async shoppingCarLinkIsVisible() {
    return await this.shoppingCartLink.isVisible();
  }

  async clickShoppingCart(){
    await this.shoppingCartLink.click();
  }

  async expandMenu() {
    await expect(this.menuHamburgerIcon).toBeVisible();
    await this.menuHamburgerIcon.click();
  }

  async clickMenuElement(menuElement: string) {
    this.menuItem = this.page.getByRole("link", { name: menuElement });
    await this.menuItem.click();
  }

  async getDisplayedProductNames(): Promise<string[]> {
    return await this.productNameLabel.allInnerTexts();
  }

  async getDisplayedProductPrices(): Promise<string[]> {
    return await this.productPriceLabel.allInnerTexts();
  }

  async sortProductsByNameAsc() {
    await this.productSortSelect.selectOption({ value: "az" });
  }

  async sortProductsByNameDesc() {
    await this.productSortSelect.selectOption({ value: "za" });
  }

  async sortProductsByPriceAsc() {
    await this.productSortSelect.selectOption({ value: "lohi" });
  }

  async sortProductsByPriceDesc() {
    await this.productSortSelect.selectOption({ value: "hilo" });
  }

  async expectProductNamesOrder(expectedProductNames: string[]) {
    const displayedProductNames = await this.getDisplayedProductNames();
    expect(displayedProductNames).toEqual(expectedProductNames);
  }

  async expectProductPricesOrder(expectedProductPrices: string[]) {
    const displayedPrices = await this.getDisplayedProductPrices();
    expect(displayedPrices).toEqual(expectedProductPrices);
  }

  async clickAddToCartForSelectedProduct(productName: string) {
   await this.page.click(`[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, "-")}"]`);
  }
}
