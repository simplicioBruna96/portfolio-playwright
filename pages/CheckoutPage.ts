import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly zipCodeField: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly errorMessage: Locator;
  readonly summaryTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.zipCodeField = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.summaryTotal = page.locator('[data-test="total-label"]');
  }

  async fillInfo(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.zipCodeField.fill(zipCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async completeCheckout(firstName: string, lastName: string, zipCode: string) {
    await this.fillInfo(firstName, lastName, zipCode);
    await this.continue();
    await this.finish();
  }
}