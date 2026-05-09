import { formatMonthYear } from "../../utils/dateUtils";

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "confirmed", label: "Confirmed" },
];

export default function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
  onToday,
  isCurrentMonth,
  statusFilter,
  onStatusFilterChange,
}) {
  const monthLabel = formatMonthYear(new Date(year, month));

  return (
    <div className="cal-header">
      <div className="cal-header__nav">
        <button
          className="nav-btn"
          onClick={onPrev}
          aria-label="Previous month"
        >
          ‹
        </button>

        <h2 className="cal-header__title">{monthLabel}</h2>

        <button
          className="nav-btn"
          onClick={onNext}
          aria-label="Next month"
        >
          ›
        </button>

        {!isCurrentMonth && (
          <button className="today-btn" onClick={onToday}>
            Today
          </button>
        )}
      </div>

      <div className="cal-header__filters">
        <span className="filter-label">Show:</span>

        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={`filter-btn ${
              statusFilter === option.value
                ? "filter-btn--active"
                : ""
            }`}
            onClick={() => onStatusFilterChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}