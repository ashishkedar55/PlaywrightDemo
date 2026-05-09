import { test, expect } from '@playwright/test';

import { LoginPage } from '../Pages/loginPage';
import { InventoryPage } from '../Pages/InventoryPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'; 




test('Saucedemo E2E Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.navigateToLogin();
  await loginPage.login(USERNAME, PASSWORD);

  await expect(page).toHaveURL(BASE_URL + 'inventory.html');

  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();

  await cartPage.verifyItemInCart('Sauce Labs Backpack');
  await cartPage.proceedToCheckout();

  await checkoutPage.fillCheckoutDetails('Ashish', 'Kedar', '12345');
  await checkoutPage.finishOrder();
  await checkoutPage.verifyOrderSuccess();
});