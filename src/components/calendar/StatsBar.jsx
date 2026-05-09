import { parseDate, formatShortDate } from "../../utils/dateUtils";

export default function StatsBar({ avgOccupancy, totalBookings, peakDay, peakCount }) {
  const peakLabel = peakDay
    ? formatShortDate(parseDate(peakDay))
    : "—";

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <span className="stat-card__value">{avgOccupancy}%</span>
        <span className="stat-card__label">Avg Occupancy</span>
      </div>
      <div className="stat-card">
        <span className="stat-card__value">{totalBookings}</span>
        <span className="stat-card__label">Bookings This Month</span>
      </div>
      <div className="stat-card">
        <span className="stat-card__value">{peakLabel}</span>
        <span className="stat-card__label">Peak Day ({peakCount} rooms)</span>
      </div>
    </div>
  );
}
