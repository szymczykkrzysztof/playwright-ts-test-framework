import { Page, expect } from "@playwright/test";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";

export class ShoppingCartSteps {
  readonly page: Page;
  readonly shoppingCartPage: ShoppingCartPage;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartPage = new ShoppingCartPage(page);
  }

  async userNavigatedToShoppingCartPage() {
    await expect(this.page).toHaveURL(this.shoppingCartPage.pageUrl);
  }

  async userSeesProductInShoppingCart(productName: string) {
    expect(
      await this.shoppingCartPage.itemExistInCartList(productName)
    ).toBeTruthy();
  }

  async userShouldNotSeeProductInShopping(productName: string){
     expect(
      await this.shoppingCartPage.itemExistInCartList(productName)
    ).toBeFalsy();
  }

  async usersSeesProductsInShoppingCart(productNames:string[]){
    for (const productName of productNames) {
        await this.userSeesProductInShoppingCart(productName)
    }
  }

  async userRemovesProductFromShoppingCart(productName:string){
    await this.shoppingCartPage.removeItemFromCartList(productName);
  }

  async userCheckoutsProductsFromCart(){
    await this.shoppingCartPage.clickCheckoutButton();
  }
}
