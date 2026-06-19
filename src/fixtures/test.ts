import { expect, type APIRequestContext } from '@playwright/test';
import { test as base } from 'playwright-bdd';
import { env } from '../../config/env.js';
import { JsonPlaceholderClient } from '../api/json-placeholder-client.js';
import { DocsPage } from '../pages/docs-page.js';
import { HomePage } from '../pages/home-page.js';
import { Accessibility } from '../utils/accessibility.js';

type AppFixtures = {
  homePage: HomePage;
  docsPage: DocsPage;
  accessibility: Accessibility;
  apiClient: JsonPlaceholderClient;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  docsPage: async ({ page }, use) => {
    await use(new DocsPage(page));
  },
  accessibility: async ({ page }, use) => {
    await use(new Accessibility(page));
  },
  apiClient: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({
      baseURL: env.API_BASE_URL,
      extraHTTPHeaders: {
        Accept: 'application/json',
      },
    });

    await use(new JsonPlaceholderClient(request));
    await request.dispose();
  },
});

export { expect };
export type { APIRequestContext };
