import PropTypes from 'prop-types';

const filters = [
  { value: 'all', label: 'Tất cả' },
  { value: 'active', label: 'Chưa xong' },
  { value: 'completed', label: 'Đã xong' }
];

function FilterBar({ currentFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc công việc">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onFilterChange(filter.value)}
          aria-pressed={currentFilter === filter.value}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${currentFilter === filter.value ? 'bg-ink text-white dark:bg-sun dark:text-ink' : 'bg-ink/5 text-ink/65 hover:bg-ink/10 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15'}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

FilterBar.propTypes = {
  currentFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default FilterBar;
