import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ quiet: true });

const optionalNumber = z
  .string()
  .trim()
  .optional()
  .transform((value) => {
    if (!value) {
      return undefined;
    }

    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < 0) {
      throw new Error(`Expected a non-negative integer, received "${value}"`);
    }

    return parsed;
  });

const booleanLike = (defaultValue: boolean) =>
  z
    .enum(['true', 'false'])
    .optional()
    .default(String(defaultValue) as 'true' | 'false')
    .transform((value) => value === 'true');

const schema = z.object({
  ENVIRONMENT: z.enum(['local', 'dev', 'qa', 'stage', 'prod']).default('local'),
  BASE_URL: z.url().default('https://playwright.dev'),
  API_BASE_URL: z.url().default('https://jsonplaceholder.typicode.com'),
  CI: booleanLike(false),
  HEADLESS: booleanLike(true),
  WORKERS: optionalNumber,
  RETRIES: optionalNumber,
  TEST_USER_EMAIL: z.string().optional(),
  TEST_USER_PASSWORD: z.string().optional(),
});

export const env = schema.parse(process.env);

export type TestEnvironment = typeof env;
