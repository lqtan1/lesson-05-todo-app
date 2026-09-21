import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="overflow-hidden rounded-2xl border border-ink/10 bg-white/80 shadow-soft dark:border-white/10 dark:bg-white/[0.06]" aria-label="Danh sách công việc">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TodoList;
