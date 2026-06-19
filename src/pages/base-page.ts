import { expect, type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async expectReady(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async expectTitle(title: RegExp | string): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }
}
