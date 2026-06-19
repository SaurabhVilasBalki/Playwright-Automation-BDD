import { readFileSync } from 'node:fs';
import { parse } from 'csv-parse/sync';

export type CsvRow = Record<string, string>;

type CsvOptions<T> = {
  requiredHeaders?: string[];
  map?: (row: CsvRow, index: number) => T;
};

export function readCsv<T = CsvRow>(filePath: string, options: CsvOptions<T> = {}): T[] {
  const content = readFileSync(filePath, 'utf-8');
  const rows = parse(content, {
    bom: true,
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as CsvRow[];

  assertRequiredHeaders(filePath, rows, options.requiredHeaders ?? []);

  if (!options.map) {
    return rows as T[];
  }

  return rows.map((row, index) => options.map?.(row, index) as T);
}

function assertRequiredHeaders(filePath: string, rows: CsvRow[], requiredHeaders: string[]): void {
  if (requiredHeaders.length === 0) {
    return;
  }

  const headers = new Set(Object.keys(rows[0] ?? {}));
  const missingHeaders = requiredHeaders.filter((header) => !headers.has(header));

  if (missingHeaders.length > 0) {
    throw new Error(`Missing required CSV header(s) in ${filePath}: ${missingHeaders.join(', ')}`);
  }
}

export function parseBoolean(value: string): boolean {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  throw new Error(`Expected boolean CSV value "true" or "false", received "${value}"`);
}

export function requiredValue(row: CsvRow, fieldName: string): string {
  const value = row[fieldName];

  if (!value) {
    throw new Error(`Missing required CSV value for "${fieldName}"`);
  }

  return value;
}

export function parseInteger(value: string, fieldName: string): number {
  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    throw new Error(`Expected integer CSV value for "${fieldName}", received "${value}"`);
  }

  return parsed;
}
