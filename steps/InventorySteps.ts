import { extractPrices, formatPrices } from "../helpers/price-helper";
import { sortNumbersAscending, sortNumbersDescending, sortStringsAscending, sortStringsDescending } from "../helpers/sort-helper";
import { InventoryPage } from "../pages/InventoryPage";
import { Page, expect } from "@playwright/test";

export class InventorySteps {
  private readonly page: Page;
  private readonly inventoryPage: InventoryPage;

  constructor(page: Page) {
    this.page = page;
    this.inventoryPage = new InventoryPage(page);
  }

  async userNavigatedToInventoryPage() {
    await expect(this.page).toHaveURL(this.inventoryPage.pageUrl);
  }

  async userSeesShoppingCart() {
    expect(await this.inventoryPage.shoppingCarLinkIsVisible()).toBeTruthy();
  }

  async userLogsOut() {
    await this.inventoryPage.expandMenu();
    await this.inventoryPage.clickMenuElement("Logout");
  }

  async userSortsProductsByNameAsc() {
    const productNames = await this.inventoryPage.getDisplayedProductNames();
    const sortedProductNames = sortStringsAscending(productNames)
    await this.inventoryPage.sortProductsByNameAsc();
    await this.inventoryPage.expectProductNamesOrder(sortedProductNames);
  }

  async userSortsProductsByNameDesc() {
     const productNames = await this.inventoryPage.getDisplayedProductNames();
    const sortedProductNames = sortStringsDescending(productNames)
    await this.inventoryPage.sortProductsByNameDesc();
    await this.inventoryPage.expectProductNamesOrder(sortedProductNames);
  }

  async userSortsProductsByPriceAsc() {
    const productPrices = extractPrices(await this.inventoryPage.getDisplayedProductPrices())
    const sortedProductPrices = sortNumbersAscending(productPrices);
    const productPricesAsc = formatPrices(sortedProductPrices);

    await this.inventoryPage.sortProductsByPriceAsc();
    await this.inventoryPage.expectProductPricesOrder(productPricesAsc);
  }

  async userSortsProductsByPriceDesc() {
    const productPrices = extractPrices(await this.inventoryPage.getDisplayedProductPrices())
    const sortedProductPrices = sortNumbersDescending(productPrices);
    const productPricesAsc = formatPrices(sortedProductPrices);
    await this.inventoryPage.sortProductsByPriceDesc();
    await this.inventoryPage.expectProductPricesOrder(productPricesAsc);
  }

  async userAddsProductToCart(productName:string){
    await this.inventoryPage.clickAddToCartForSelectedProduct(productName);
  }

  async userOpensShoppingCart(){
    await this.inventoryPage.clickShoppingCart();
  }
}
