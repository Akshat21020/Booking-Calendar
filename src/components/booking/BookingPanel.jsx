import BookingList from "./BookingList";
import { formatShortDate } from "../../utils/dateUtils";

export default function BookingPanel({
  selectionStart,  
  selectionEnd,    
  bookings,        
  onClear,
}) {
  const hasSelection = selectionStart !== null && selectionEnd !== null;

  return (
    <aside className="booking-panel">
      <div className="booking-panel__header">
        <h3 className="booking-panel__title">
          {hasSelection
            ? `${formatShortDate(selectionStart)} – ${formatShortDate(selectionEnd)}`
            : "Select a range"}
        </h3>
        {hasSelection && (
          <button className="clear-btn" onClick={onClear} aria-label="Clear selection">
            ✕
          </button>
        )}
      </div>

      {hasSelection ? (
        <>
          <p className="booking-panel__count">
            {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
          </p>
          <BookingList bookings={bookings} />
        </>
      ) : (
        <p className="booking-panel__hint">
          Drag across the calendar to select a date range and view overlapping bookings.
        </p>
      )}
    </aside>
  );
}
