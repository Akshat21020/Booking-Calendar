import { useMemo } from "react";
import DayCell from "./DayCell";
import { buildCalendarDays, WEEKDAY_LABELS } from "../../utils/calendarUtils";
import { isSameDay, isInRange, startOfDay } from "../../utils/dateUtils";

export default function CalendarGrid({
  year,
  month,
  occupancyMap,      
  selectionStart,    
  selectionEnd,      
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  const today = startOfDay(new Date());

  const days = useMemo(() => buildCalendarDays(year, month), [year, month]);

  return (
    <div className="cal-grid" onMouseLeave={() => {}}>

      <div className="cal-grid__weekdays">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="cal-grid__weekday-label">{label}</div>
        ))}
      </div>

      
      <div className="cal-grid__days">
        {days.map((dayObj) => {
          const occupancy   = occupancyMap.get(dayObj.dateStr) ?? 0;
          const isToday     = isSameDay(dayObj.date, today);

          
          const isSelected  =
            selectionStart !== null &&
            selectionEnd   !== null &&
            isInRange(dayObj.date, selectionStart, selectionEnd);

          const isRangeStart =
            selectionStart !== null && isSameDay(dayObj.date, selectionStart);
          const isRangeEnd   =
            selectionEnd   !== null && isSameDay(dayObj.date, selectionEnd);

          return (
            <DayCell
              key={dayObj.dateStr}
              dayObj={dayObj}
              occupancy={occupancy}
              isSelected={isSelected}
              isRangeStart={isRangeStart}
              isRangeEnd={isRangeEnd}
              isToday={isToday}
              onMouseDown={onMouseDown}
              onMouseEnter={onMouseEnter}
              onMouseUp={onMouseUp}
            />
          );
        })}
      </div>
    </div>
  );
}
