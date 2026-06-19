export function uniqueEmail(prefix = 'test.user'): string {
  return `${prefix}+${Date.now()}@example.com`;
}
