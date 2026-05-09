import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  private itemNames: Locator;
  private addToCartButtons: Locator;
  private cartIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.itemNames = page.locator('//div[@class="inventory_item_name "]');
    this.addToCartButtons = page.locator('//button[text()="Add to cart"]');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addItemToCart(itemName: string): Promise<void> {
    const items = await this.itemNames.allTextContents();

    for (let i = 0; i < items.length; i++) {
      if (items[i].includes(itemName)) {
        await this.addToCartButtons.nth(i).click();
        break;
      }
    }
  }

  async goToCart(): Promise<void> {
    await this.click(this.cartIcon);
  }
}