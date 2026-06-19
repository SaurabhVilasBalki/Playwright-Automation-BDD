import { createBdd } from 'playwright-bdd';
import { expect, test } from '../../../src/fixtures/test.js';

const { Given, When, Then } = createBdd(test);

Given('I am on the Playwright home page', async ({ homePage }) => {
  await homePage.open();
});

When('I open the getting started documentation', async ({ homePage }) => {
  await homePage.openDocs();
});

Then('I should see the documentation page', async ({ docsPage }) => {
  await expect(docsPage.heading).toBeVisible();
});
