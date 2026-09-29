import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async removeItem(itemName: string) {
    const item = this.items.filter({ hasText: itemName });
    await item.getByText('Remove').click();
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}