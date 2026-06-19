import { AxeBuilder } from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

type AxeImpact = 'minor' | 'moderate' | 'serious' | 'critical';

export class Accessibility {
  constructor(private readonly page: Page) {}

  async expectNoViolations(impacts: AxeImpact[] = ['critical']): Promise<void> {
    const results = await new AxeBuilder({ page: this.page }).analyze();
    const violations = results.violations.filter(
      (violation) => violation.impact && impacts.includes(violation.impact),
    );

    expect(violations).toEqual([]);
  }
}
