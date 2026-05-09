import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private firstName: Locator;
  private lastName: Locator;
  private postalCode: Locator;
  private continueButton: Locator;
  private finishButton: Locator;
  private confirmationMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('//input[@value="Continue"]');
    this.finishButton = page.locator('//button[text()="Finish"]');
    this.confirmationMessage = page.locator('.complete-header');
  }

  async fillCheckoutDetails(fName: string, lName: string, zip: string): Promise<void> {
    await this.fill(this.firstName, fName);
    await this.fill(this.lastName, lName);
    await this.fill(this.postalCode, zip);
    await this.click(this.continueButton);
  }

  async finishOrder(): Promise<void> {
    await this.click(this.finishButton);
  }

  async verifyOrderSuccess(): Promise<void> {
    await expect(this.confirmationMessage).toHaveText('Thank you for your order!');
  }
}