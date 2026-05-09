import { useState, useMemo } from "react";

import { useBookings }  from "./hooks/useBookings";
import { useCalendar }  from "./hooks/useCalendar";
import { useSelection } from "./hooks/useSelection";

import CalendarHeader from "./components/calendar/CalendarHeader";
import CalendarGrid   from "./components/calendar/CalendarGrid";
import StatsBar       from "./components/calendar/StatsBar";
import BookingPanel   from "./components/booking/BookingPanel";

import { buildOccupancyMap, getBookingsInRange, computeMonthStats } from "./utils/bookingUtils";
import { addDays }    from "./utils/dateUtils";
import { MAX_ROOMS }  from "./constants/colors";

export default function App() {

  const { bookings, loading, error } = useBookings();

  const { year, month, goToPrev, goToNext, goToToday, isCurrentMonth } = useCalendar();

  const {
    selectionStart, selectionEnd, isSelecting,
    handleMouseDown, handleMouseEnter, handleMouseUp,
    clearSelection,
  } = useSelection();

  
  const [statusFilter, setStatusFilter] = useState("all");

  
  const occupancyMap = useMemo(
    () => buildOccupancyMap(bookings, statusFilter),
    [bookings, statusFilter]
  );

  const overlappingBookings = useMemo(() => {
    if (!selectionStart || !selectionEnd) return [];
   
    return getBookingsInRange(
      bookings,
      selectionStart,
      addDays(selectionEnd, 1),
      statusFilter
    );
  }, [bookings, selectionStart, selectionEnd, statusFilter]);

  
  const stats = useMemo(
    () => computeMonthStats(year, month, occupancyMap, bookings, statusFilter, MAX_ROOMS),
    [year, month, occupancyMap, bookings, statusFilter]
  );


  return (
    <div
      className="app"
      style={{ userSelect: isSelecting ? "none" : "auto" }}
    >
      <header className="app__header">
        <h1 className="app__title">Booking Calendar</h1> 
      </header>

      <main className="app__body">
        <section className="calendar-section">
          <CalendarHeader
            year={year}
            month={month}
            onPrev={goToPrev}
            onNext={goToNext}
            onToday={goToToday}
            isCurrentMonth={isCurrentMonth}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          <CalendarGrid
            year={year}
            month={month}
            occupancyMap={occupancyMap}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
          />

          {/* <StatsBar
            avgOccupancy={stats.avgOccupancy}
            totalBookings={stats.totalBookings}
            peakDay={stats.peakDay}
            peakCount={stats.peakCount}
          /> */}
        </section>

      
        <BookingPanel
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
          bookings={overlappingBookings}
          onClear={clearSelection}
        />
      </main>

      {/* Heatmap legend */}
      <footer className="app__legend">
        <span className="legend-label">Occupancy:</span>
        {["0", "1–2", "3–4", "5–6", "7–8", "9+"].map((label, i) => (
          <span key={i} className={`legend-swatch legend-swatch--${i}`}>{label}</span>
        ))}
      </footer>
    </div>
  );
}
