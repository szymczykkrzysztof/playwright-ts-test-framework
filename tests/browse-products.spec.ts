import { test } from "@playwright/test";
import { LoginSteps } from "../steps/LoginSteps";
import { InventorySteps } from "../steps/InventorySteps";
import { ShoppingCartSteps } from "../steps/ShoppingCartSteps";
import { CheckoutSteps } from "../steps/CheckoutSteps";

let loginSteps: LoginSteps;
let inventorySteps: InventorySteps;
let shoppingCartSteps: ShoppingCartSteps;
let checkoutSteps: CheckoutSteps;

test.beforeEach(async ({ page }) => {
  loginSteps = new LoginSteps(page);
  inventorySteps = new InventorySteps(page);
  shoppingCartSteps = new ShoppingCartSteps(page);
  checkoutSteps = new CheckoutSteps(page);
  await page.goto("/");
  const username = "standard_user";
  const password = "secret_sauce";
  await loginSteps.userLogsInWithUsernameAndPassword(username, password);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("TC #5: User can sort products on Inventory page", async () => {
  await inventorySteps.userNavigatedToInventoryPage();
  await inventorySteps.userSortsProductsByNameAsc();
  await inventorySteps.userSortsProductsByNameDesc();
  await inventorySteps.userSortsProductsByPriceAsc();
  await inventorySteps.userSortsProductsByPriceDesc();
});

test("TC #6: User can add items to shopping cart", async () => {
  await inventorySteps.userNavigatedToInventoryPage();
  await inventorySteps.userAddsProductToCart("Sauce Labs Backpack");
  await inventorySteps.userAddsProductToCart("Sauce Labs Bolt T-Shirt");
  await inventorySteps.userOpensShoppingCart();
  await shoppingCartSteps.userNavigatedToShoppingCartPage();
  await shoppingCartSteps.usersSeesProductsInShoppingCart([
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
  ]);
});

test("TC #7: User can remove items from shopping cart", async () => {
  await inventorySteps.userNavigatedToInventoryPage();
  await inventorySteps.userAddsProductToCart("Sauce Labs Backpack");
  await inventorySteps.userAddsProductToCart("Sauce Labs Bolt T-Shirt");
  await inventorySteps.userOpensShoppingCart();
  await shoppingCartSteps.userNavigatedToShoppingCartPage();
  await shoppingCartSteps.usersSeesProductsInShoppingCart([
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
  ]);
  await shoppingCartSteps.userRemovesProductFromShoppingCart(
    "Sauce Labs Backpack"
  );
  await shoppingCartSteps.usersSeesProductsInShoppingCart([
    "Sauce Labs Bolt T-Shirt",
  ]);
  await shoppingCartSteps.userShouldNotSeeProductInShopping(
    "Sauce Labs Backpack"
  );
});

test("TC #8: User can place order", async () => {
  await inventorySteps.userNavigatedToInventoryPage();
  await inventorySteps.userAddsProductToCart("Sauce Labs Backpack");
  await inventorySteps.userAddsProductToCart("Sauce Labs Bolt T-Shirt");
  await inventorySteps.userOpensShoppingCart();
  await shoppingCartSteps.userNavigatedToShoppingCartPage();
  await shoppingCartSteps.usersSeesProductsInShoppingCart([
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
  ]);
  await shoppingCartSteps.userCheckoutsProductsFromCart();
  await checkoutSteps.userShouldSeeCheckoutHeader();
  await checkoutSteps.userEntersPersonalData("Krzysztof", "Jarzyna", "52-200");
  await checkoutSteps.userShouldSeeCheckoutOverviewHeader();
  await checkoutSteps.usersSeesProductsInCheckoutList([
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
  ]);
  await checkoutSteps.userChecksItemsPrice("45.98","49.66");
  await checkoutSteps.userFinishCheckout()
});
