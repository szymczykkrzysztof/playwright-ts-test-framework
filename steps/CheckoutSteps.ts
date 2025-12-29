import { Page, expect } from "@playwright/test";
import { CheckoutPage } from "../pages/CheckOutPage";
export class CheckoutSteps {
  private readonly checkoutPage: CheckoutPage;

  constructor(page: Page) {
    this.checkoutPage = new CheckoutPage(page);
  }

  async userShouldSeeCheckoutHeader() {
    expect(this.checkoutPage.getCheckoutHeaderVisibility).toBeTruthy();
  }

  async userShouldSeeCheckoutOverviewHeader() {
    expect(this.checkoutPage.getCheckoutOverviewHeaderVisibility).toBeTruthy();
  }

  async userEntersPersonalData(firstName:string,lastName:string,zipPostal :string){
    await this.checkoutPage.setFirstName(firstName);
    await this.checkoutPage.setLastName(lastName);
    await this.checkoutPage.setZipPostalCode(zipPostal);
    await this.checkoutPage.selectContinueButton();
  }

  async userSeesProductInCheckoutList(productName: string) {
    expect(
      await this.checkoutPage.itemExistInCheckoutList(productName)
    ).toBeTruthy();
  }

  async usersSeesProductsInCheckoutList(productNames:string[]){
    for (const productName of productNames) {
        await this.userSeesProductInCheckoutList(productName)
    }
  }

  async userChecksItemsPrice(itemTotalPrice:string, itemTotalWithTax:string){
    const {itemTotal, total} = await this.checkoutPage.getCheckoutTotals();
    expect (itemTotal).toEqual(itemTotalPrice);
    expect (total).toEqual(itemTotalWithTax)
  }

   async userFinishCheckout() {
    await this.checkoutPage.selectFinishButton();
    expect (await this.checkoutPage.getCheckoutCompleteHeaderVisibility()).toBeTruthy();
  }
}
