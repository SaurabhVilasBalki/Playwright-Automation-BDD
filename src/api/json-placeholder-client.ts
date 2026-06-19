import { expect, type APIRequestContext } from '@playwright/test';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export class JsonPlaceholderClient {
  constructor(private readonly request: APIRequestContext) {}

  async getTodo(id: number): Promise<Todo> {
    const response = await this.request.get(`/todos/${id}`);
    await expect(response).toBeOK();
    return (await response.json()) as Todo;
  }
}
