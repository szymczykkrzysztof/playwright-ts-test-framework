import { test } from "@playwright/test";
import { LoginSteps } from "../steps/LoginSteps";
import { InventorySteps } from "../steps/InventorySteps";

let loginSteps: LoginSteps;
let inventorySteps: InventorySteps;

test.beforeEach(async ({ page }) => {
  loginSteps = new LoginSteps(page);
  inventorySteps = new InventorySteps(page);
  await page.goto("/");
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("TC #1: User can login with valid credentials", async () => {
  const username = "standard_user";
  const password = "secret_sauce";

  await loginSteps.userLogsInWithUsernameAndPassword(username, password);
  await inventorySteps.userNavigatedToInventoryPage();
  await inventorySteps.userSeesShoppingCart();
});

test("TC #2: User cannot login with invalid credentials", async () => {
  const username = "standard_user";
  const password = "secret_sauce@";
  const errorMessage =
    "Epic sadface: Username and password do not match any user in this service";

  await loginSteps.userLogsInWithUsernameAndPassword(username, password);
  await loginSteps.userChecksError(errorMessage);
});

test("TC #3: Locked out user cannot login ", async () => {
  const username = "locked_out_user";
  const password = "secret_sauce";
  const errorMessage = "Epic sadface: Sorry, this user has been locked out.";

  await loginSteps.userLogsInWithUsernameAndPassword(username, password);
  await loginSteps.userChecksError(errorMessage);
});

test("TC#4: User can logout", async () => {
  const username = "standard_user";
  const password = "secret_sauce";

  await loginSteps.userLogsInWithUsernameAndPassword(username, password);
  await inventorySteps.userNavigatedToInventoryPage();
  await inventorySteps.userLogsOut();
  await loginSteps.usersNavigatedToLoginPage();
});
