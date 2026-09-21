import PropTypes from 'prop-types';

function Stats({ stats }) {
  const items = [
    { label: 'Tổng số', value: stats.total },
    { label: 'Chưa xong', value: stats.active },
    { label: 'Đã xong', value: stats.completed }
  ];

  return (
    <dl className="grid grid-cols-3 gap-2 rounded-2xl bg-teal px-3 py-4 text-center text-white shadow-soft">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">{item.label}</dt>
          <dd className="mt-1 font-display text-2xl font-bold">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

Stats.propTypes = {
  stats: PropTypes.shape({ total: PropTypes.number.isRequired, active: PropTypes.number.isRequired, completed: PropTypes.number.isRequired }).isRequired
};

export default Stats;
