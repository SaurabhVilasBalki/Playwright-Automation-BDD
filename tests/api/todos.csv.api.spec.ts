import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '../../src/fixtures/test.js';
import {
  parseBoolean,
  parseInteger,
  readCsv,
  requiredValue,
} from '../../src/utils/csv-data.js';

type TodoTestData = {
  id: number;
  userId: number;
  completed: boolean;
  titleContains: string;
};

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const todoRows = readCsv<TodoTestData>(path.resolve(currentDir, '../../data/test-data/todos.csv'), {
  requiredHeaders: ['id', 'userId', 'completed', 'titleContains'],
  map: (row) => ({
    id: parseInteger(requiredValue(row, 'id'), 'id'),
    userId: parseInteger(requiredValue(row, 'userId'), 'userId'),
    completed: parseBoolean(requiredValue(row, 'completed')),
    titleContains: requiredValue(row, 'titleContains'),
  }),
});

test.describe('Todos API CSV data-driven tests', () => {
  for (const todoData of todoRows) {
    test(`@smoke validates todo ${todoData.id} from CSV`, async ({ apiClient }) => {
      const todo = await apiClient.getTodo(todoData.id);

      expect(todo).toMatchObject({
        id: todoData.id,
        userId: todoData.userId,
        completed: todoData.completed,
      });
      expect(todo.title).toContain(todoData.titleContains);
    });
  }
});
