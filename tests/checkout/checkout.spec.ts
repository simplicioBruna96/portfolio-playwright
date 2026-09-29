import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { USERS } from '../../utils/dataFactory';

test.describe('Feature: Checkout', () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.checkout();
  });

  test('CHK-01: Complete checkout successfully', async () => {
    await checkoutPage.completeCheckout('QA', 'Tester', '01000');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('CHK-02: Empty first name shows error', async () => {
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('CHK-03: Empty last name shows error', async () => {
    await checkoutPage.fillInfo('QA', '', '');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
  });

  test('CHK-04: Empty zip code shows error', async () => {
    await checkoutPage.fillInfo('QA', 'Tester', '');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });

  test('CHK-05: Cancel returns to cart', async ({ page }) => {
    await checkoutPage.cancelButton.click();
    await expect(page).toHaveURL(/cart/);
  });

  test('CHK-06: Summary shows total', async () => {
    await checkoutPage.fillInfo('QA', 'Tester', '01000');
    await checkoutPage.continue();
    await expect(checkoutPage.summaryTotal).toContainText('$');
  });
});