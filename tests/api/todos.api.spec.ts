import { expect, test } from '../../src/fixtures/test.js';

test.describe('Todos API', () => {
  test('@smoke fetches a todo by id', async ({ apiClient }) => {
    const todo = await apiClient.getTodo(1);

    expect(todo).toMatchObject({
      id: 1,
      userId: 1,
      completed: false,
    });
    expect(todo.title.length).toBeGreaterThan(0);
  });
});
