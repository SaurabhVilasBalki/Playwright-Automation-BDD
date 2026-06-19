import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page.js';

export class HomePage extends BasePage {
  readonly getStartedLink: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.getStartedLink = page.getByRole('link', { name: 'Get started' }).first();
    this.searchButton = page.getByRole('button', { name: /search/i });
  }

  async open(): Promise<void> {
    await this.goto('/');
    await this.expectTitle(/Playwright/);
  }

  async openDocs(): Promise<void> {
    await this.getStartedLink.click();
    await expect(this.page).toHaveURL(/.*docs\/intro.*/);
  }

  async searchFor(term: string): Promise<void> {
    await this.searchButton.click();
    await this.page.getByRole('searchbox').fill(term);
  }
}
