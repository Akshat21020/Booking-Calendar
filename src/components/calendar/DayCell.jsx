import { getHeatmapColor } from "../../constants/colors";
import { isSameDay } from "../../utils/dateUtils";

export default function DayCell({
  dayObj,           
  occupancy,       
  isSelected,       
  isRangeStart,     
  isRangeEnd,       
  isToday,          
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  const { date, isCurrentMonth } = dayObj;
  const { bg, text } = getHeatmapColor(occupancy);

  const classes = [
    "day-cell",
    !isCurrentMonth    && "day-cell--dim",
    isSelected         && "day-cell--selected",
    isRangeStart       && "day-cell--range-start",
    isRangeEnd         && "day-cell--range-end",
    isToday            && "day-cell--today",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      style={{
        backgroundColor: isSelected ? undefined : bg,
        color: isSelected ? undefined : text,
      }}
      onMouseDown={() => onMouseDown(date)}
      onMouseEnter={() => onMouseEnter(date)}
      onMouseUp={() => onMouseUp(date)}
    >
      <span className="day-cell__number">{date.getDate()}</span>
      {occupancy > 0 && (
        <span className="day-cell__badge">{occupancy}</span>
      )}
    </div>
  );
}
