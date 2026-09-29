import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { USERS } from '../../utils/dataFactory';

test.describe('Feature: Shopping Cart', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
  });

  test('CART-01: Added item appears in cart', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    const items = await cartPage.getItemNames();
    expect(items).toContain('Sauce Labs Backpack');
  });

  test('CART-02: Multiple items in cart', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await expect(cartPage.items).toHaveCount(2);
  });

  test('CART-03: Remove item from cart', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await cartPage.removeItem('Sauce Labs Backpack');
    await expect(cartPage.items).toHaveCount(1);
  });

  test('CART-04: Continue shopping returns to inventory', async ({ page }) => {
    await inventoryPage.goToCart();
    await cartPage.continueShoppingButton.click();
    await expect(page).toHaveURL(/inventory/);
  });

  test('CART-05: Empty cart shows no items', async () => {
    await inventoryPage.goToCart();
    await expect(cartPage.items).toHaveCount(0);
  });
});