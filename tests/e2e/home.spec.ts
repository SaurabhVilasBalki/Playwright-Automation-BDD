import { expect, test } from '../../src/fixtures/test.js';

test.describe('Playwright docs navigation', () => {
  test('@smoke opens the docs from the home page', async ({ homePage, docsPage }) => {
    await homePage.open();
    await homePage.openDocs();

    await expect(docsPage.heading).toBeVisible();
  });
});
