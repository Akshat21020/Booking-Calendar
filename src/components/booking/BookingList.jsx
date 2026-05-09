import { parseDate, formatShortDate } from "../../utils/dateUtils";

export default function BookingList({ bookings }) {
  if (bookings.length === 0) {
    return <p className="booking-list__empty">No bookings in this range.</p>;
  }

  return (
    <ul className="booking-list">
      {bookings.map((b) => {
        const checkIn  = parseDate(b.checkIn);
        const checkOut = parseDate(b.checkOut);

        return (
          <li key={b.id} className={`booking-item booking-item--${b.status}`}>
            <div className="booking-item__header">
              <span className="booking-item__name">{b.guestName}</span>
              <span className={`booking-item__badge booking-item__badge--${b.status}`}>
                {b.status}
              </span>
            </div>
            <div className="booking-item__meta">
              <span>{formatShortDate(checkIn)} → {formatShortDate(checkOut)}</span>
              <span>{b.rooms} room{b.rooms !== 1 ? "s" : ""}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
