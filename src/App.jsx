import { useEffect, useMemo, useState } from 'react';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import Stats from './components/Stats';
import TodoList from './components/TodoList';
import { makeTodoId, readTodos, writeTodos } from './utils';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => window.localStorage.getItem('todo-theme') === 'dark');

  useEffect(() => {
    setTodos(readTodos());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) writeTodos(todos);
  }, [todos, isLoading]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    window.localStorage.setItem('todo-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter((todo) => todo.done).length,
    active: todos.filter((todo) => !todo.done).length
  }), [todos]);

  const filteredTodos = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return todos.filter((todo) => {
      const matchesFilter = filter === 'all' || (filter === 'active' ? !todo.done : todo.done);
      const matchesSearch = !normalizedSearch || todo.text.toLowerCase().includes(normalizedSearch);
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm, todos]);

  function handleAddTodo(event) {
    event.preventDefault();
    const text = inputValue.trim();
    if (!text) {
      setInputError('Vui lòng nhập nội dung công việc.');
      return;
    }
    setTodos((currentTodos) => [...currentTodos, { id: makeTodoId(), text, done: false }]);
    setInputValue('');
    setInputError('');
  }

  function handleToggleTodo(id) {
    setTodos((currentTodos) => currentTodos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }

  function handleDeleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function handleDeleteAll() {
    if (window.confirm('Bạn chắc chắn muốn xóa tất cả công việc?')) setTodos([]);
  }

  return (
    <div className="app-shell min-h-screen px-4 py-6 text-ink transition-colors dark:text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <header className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-teal">Lesson 05 / React + AI</p>
            <h1 className="font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl">Việc cần làm<span className="text-coral">.</span></h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-ink/60 dark:text-white/60">Một góc nhỏ để gom những việc quan trọng và nhìn thấy tiến độ mỗi ngày.</p>
          </div>
          <button type="button" onClick={() => setIsDark((value) => !value)} aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'} className="min-h-11 min-w-11 rounded-2xl border border-ink/10 bg-white/70 text-lg shadow-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10">
            {isDark ? '☼' : '☾'}
          </button>
        </header>

        <main className="space-y-4">
          <form onSubmit={handleAddTodo} noValidate className="rounded-3xl bg-ink p-4 shadow-soft sm:p-5">
            <label htmlFor="todo-input" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/60">Thêm công việc mới</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input id="todo-input" type="text" value={inputValue} onChange={(event) => { setInputValue(event.target.value); if (inputError) setInputError(''); }} placeholder="Ví dụ: Hoàn thành bài Lesson 5" aria-invalid={Boolean(inputError)} aria-describedby={inputError ? 'input-error' : undefined} className="min-h-12 min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm text-white placeholder:text-white/40" />
              <button type="submit" className="min-h-12 rounded-2xl bg-sun px-6 font-bold text-ink transition hover:-translate-y-0.5 hover:bg-[#ffd66e]">Thêm việc</button>
            </div>
            {inputError && <p id="input-error" role="alert" className="mt-2 text-sm font-medium text-[#ffb5ab]">{inputError}</p>}
          </form>

          <section aria-label="Bộ lọc và tìm kiếm" className="space-y-4 rounded-3xl border border-ink/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <FilterBar currentFilter={filter} onFilterChange={setFilter} />
          </section>

          <Stats stats={stats} />

          <section aria-live="polite" aria-busy={isLoading}>
            {isLoading && <p className="rounded-2xl border border-dashed border-ink/20 px-5 py-10 text-center text-sm text-ink/55 dark:border-white/20 dark:text-white/55">Đang tải công việc...</p>}
            {!isLoading && filteredTodos.length > 0 && <TodoList todos={filteredTodos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />}
            {!isLoading && filteredTodos.length === 0 && <div className="rounded-2xl border border-dashed border-ink/20 px-5 py-10 text-center dark:border-white/20"><p className="font-display text-lg font-bold">{todos.length === 0 ? 'Chưa có công việc nào' : 'Không tìm thấy kết quả'}</p><p className="mt-1 text-sm text-ink/55 dark:text-white/55">{todos.length === 0 ? 'Thêm một việc đầu tiên để bắt đầu.' : 'Thử đổi từ khóa hoặc bộ lọc.'}</p></div>}
          </section>

          {todos.length > 0 && <button type="button" onClick={handleDeleteAll} className="w-full rounded-2xl border border-coral/30 px-4 py-3 text-sm font-bold text-coral transition hover:bg-coral hover:text-white">Xóa tất cả công việc</button>}
        </main>

        <footer className="mt-8 text-center text-xs text-ink/45 dark:text-white/40">Dữ liệu được lưu an toàn trong trình duyệt của bạn.</footer>
      </div>
    </div>
  );
}

export default App;
