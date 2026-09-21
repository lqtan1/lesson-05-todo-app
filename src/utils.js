export const STORAGE_KEY = 'todos';

export function readTodos() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (todo) => todo && (typeof todo.id === 'number' || typeof todo.id === 'string') && typeof todo.text === 'string' && typeof todo.done === 'boolean'
    );
  } catch (error) {
    console.error('Không thể tải công việc từ localStorage:', error);
    return [];
  }
}

export function writeTodos(todos) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Không thể lưu công việc vào localStorage:', error);
  }
}

export function makeTodoId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
