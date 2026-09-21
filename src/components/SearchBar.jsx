import PropTypes from 'prop-types';

function SearchBar({ value, onChange }) {
  return (
    <div>
      <label htmlFor="search-input" className="sr-only">Tìm kiếm công việc</label>
      <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-ink/[0.04] px-4 py-3 dark:border-white/10 dark:bg-white/[0.06]">
        <span aria-hidden="true" className="text-lg text-teal">⌕</span>
        <input id="search-input" type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Tìm kiếm công việc..." className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink/40 dark:text-white dark:placeholder:text-white/40" />
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchBar;
