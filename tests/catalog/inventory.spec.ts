import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { USERS } from '../../utils/dataFactory';

test.describe('Feature: Product Catalog', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    inventoryPage = new InventoryPage(page);
  });

  test('INV-01: Displays 6 products', async () => {
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('INV-02: Sort A-Z orders alphabetically', async () => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort());
  });

  test('INV-03: Sort Z-A orders reverse', async () => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('INV-04: Sort low to high by price', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getItemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('INV-05: Sort high to low by price', async () => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getItemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('INV-06: Add item shows cart badge', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('INV-07: Remove item hides badge', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('INV-08: Logout returns to login', async ({ page }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});