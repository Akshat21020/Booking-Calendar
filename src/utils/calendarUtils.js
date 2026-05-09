import {
  startOfMonth,
  endOfMonth,
  addDays,
  toDateString,
} from "./dateUtils";

export const WEEKDAY_LABELS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export function buildCalendarDays(year, month) {
  const firstDay = startOfMonth(new Date(year, month));
  const lastDay = endOfMonth(new Date(year, month));

  const leadingDays = firstDay.getDay();
  const trailingDays = 42 - leadingDays - lastDay.getDate();

  const days = [];

  for (let i = leadingDays - 1; i >= 0; i--) {
    const date = addDays(firstDay, -i - 1);

    days.push({
      date,
      dateStr: toDateString(date),
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);

    days.push({
      date,
      dateStr: toDateString(date),
      isCurrentMonth: true,
    });
  }

  for (let i = 1; i <= trailingDays; i++) {
    const date = addDays(lastDay, i);

    days.push({
      date,
      dateStr: toDateString(date),
      isCurrentMonth: false,
    });
  }

  return days;
}