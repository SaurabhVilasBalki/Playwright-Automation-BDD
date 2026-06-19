import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page.js';

export class DocsPage extends BasePage {
  readonly heading: Locator;
  readonly installationLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /installation|getting started/i }).first();
    this.installationLink = page.getByRole('link', { name: /installation/i }).first();
  }

  async open(): Promise<void> {
    await this.goto('/docs/intro');
    await expect(this.heading).toBeVisible();
  }
}
