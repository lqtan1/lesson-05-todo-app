import PropTypes from 'prop-types';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="group flex items-center gap-3 border-b border-ink/10 px-4 py-4 last:border-b-0 hover:bg-teal/[0.04] dark:border-white/10 dark:hover:bg-white/[0.04]">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Đánh dấu hoàn thành: ${todo.text}`}
        className="h-5 w-5 shrink-0 cursor-pointer accent-teal"
      />
      <span className={`min-w-0 flex-1 break-words text-sm font-medium ${todo.done ? 'text-ink/40 line-through dark:text-white/40' : 'text-ink dark:text-white'}`}>
        {todo.text}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Xóa công việc: ${todo.text}`}
        className="min-h-11 min-w-11 shrink-0 rounded-xl px-2 text-lg text-ink/40 transition hover:bg-coral/10 hover:text-coral dark:text-white/40"
      >
        ×
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TodoItem;
