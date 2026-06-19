# Playwright Automation Framework

TypeScript Playwright framework for UI, API, accessibility, cross-browser, mobile, reporting, and CI testing.

## What Is Included

- Playwright Test with Chromium, Firefox, WebKit, mobile Chrome, and API projects.
- TypeScript strict mode, ESLint, Prettier, and npm scripts for local and CI workflows.
- Page Object Model with reusable fixtures.
- BDD feature files and step definitions powered by Playwright-BDD.
- CSV data-driven tests with typed mapping and header validation.
- API client pattern using Playwright `APIRequestContext`.
- Accessibility testing using axe-core.
- HTML, JSON, JUnit, and Allure reporters.
- Environment validation with dotenv and zod.
- GitHub Actions workflow with reports uploaded as artifacts.
- Failure diagnostics: screenshots, videos, and traces retained on failure.

## Quick Start

```bash
npm install
npm run install:browsers
cp .env.example .env
npm test
```

## Common Commands

```bash
npm run typecheck
npm run lint
npm run test:e2e
npm run test:api
npm run test:a11y
npm run test:data
npm run test:bdd
npm run test:smoke
npm run test:ui
npm run report
```

## Project Structure

```text
config/                 Typed environment configuration
src/api/                API clients and response contracts
src/fixtures/           Custom Playwright fixtures
src/pages/              Page objects
src/components/         Reusable component objects
src/utils/              Shared test utilities
tests/e2e/              Browser end-to-end tests
tests/api/              API tests
tests/accessibility/    Accessibility tests
tests/bdd/steps/        BDD step definitions
features/               Gherkin feature files
data/                   Test data and generated state
```

## CSV Data-Driven Tests

CSV files live under `data/test-data/`. Use `readCsv` from `src/utils/csv-data.ts` to load rows with required-header validation and typed mapping.

```typescript
const rows = readCsv<MyRow>('data/test-data/file.csv', {
  requiredHeaders: ['id', 'name'],
  map: (row) => ({
    id: parseInteger(requiredValue(row, 'id'), 'id'),
    name: requiredValue(row, 'name'),
  }),
});
```

The sample CSV-driven test is `tests/api/todos.csv.api.spec.ts`.

## BDD Workflow

Feature files live in `features/` and step definitions live in `tests/bdd/steps/`.

```bash
npm run bdd:gen
npm run test:bdd
```

BDD tests are generated into `.features-gen/` and executed by the `bdd-chromium` Playwright project. Keep step definitions thin and delegate browser interaction to page objects, components, fixtures, or API clients.

## Environment Variables

Copy `.env.example` to `.env` and update values as needed.

| Variable | Purpose |
| --- | --- |
| `ENVIRONMENT` | One of `local`, `dev`, `qa`, `stage`, or `prod`. |
| `BASE_URL` | UI application base URL. |
| `API_BASE_URL` | API base URL. |
| `HEADLESS` | `true` or `false`. |
| `WORKERS` | Optional worker count override. |
| `RETRIES` | Optional retry count override. |
| `TEST_USER_EMAIL` | Optional login test account. |
| `TEST_USER_PASSWORD` | Optional login test password. |

## Standards Used

- Prefer user-facing locators: roles, labels, text, and `data-testid` only where needed.
- Keep tests declarative; put interaction details in pages, components, fixtures, and API clients.
- Avoid arbitrary waits. Use Playwright auto-waiting and web-first assertions.
- Make setup explicit and repeatable. Store generated auth state under `data/global/`.
- Keep CI deterministic with locked dependencies, retries only in CI, traces on failure, and artifact uploads.

## Adding Authenticated Tests

1. Put login logic in `tests/global.setup.ts`.
2. Save auth state with `page.context().storageState({ path: 'data/global/storage-state.json' })`.
3. Add `storageState: 'data/global/storage-state.json'` to the authenticated project in `playwright.config.ts`.

## Reporting

Playwright HTML reports are generated in `playwright-report/`.

Allure raw results are generated in `allure-results/`. To build and open the Allure report:

```bash
npm run allure:generate
npm run allure:open
```
