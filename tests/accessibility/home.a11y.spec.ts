import { test } from '../../src/fixtures/test.js';

test.describe('Accessibility', () => {
  test('@regression home page has no critical axe violations', async ({ homePage, accessibility }) => {
    await homePage.open();
    await accessibility.expectNoViolations();
  });
});
