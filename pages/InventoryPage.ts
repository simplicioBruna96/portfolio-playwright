import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.items = page.locator('[data-test="inventory-item"]');
  }

  async addItemToCart(itemName: string) {
    const item = this.page.locator('[data-test="inventory-item"]').filter({ hasText: itemName });
    await item.getByText('Add to cart').click();
  }

  async removeItemFromCart(itemName: string) {
    const item = this.page.locator('[data-test="inventory-item"]').filter({ hasText: itemName });
    await item.getByText('Remove').click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const texts = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
    return texts.map(t => parseFloat(t.replace('$', '')));
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}