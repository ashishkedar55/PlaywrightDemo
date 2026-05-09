import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private cartItems: Locator;
  private checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item .inventory_item_name');
    this.checkoutButton = page.locator('//button[text()="Checkout"]');
  }

  async verifyItemInCart(itemName: string): Promise<void> {
    const items = await this.cartItems.allTextContents();
    expect(items).toContain(itemName);
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(this.checkoutButton);
  }
}
