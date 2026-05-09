import { useState } from "react";

export function useCalendar() {
  const today = new Date();

  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  function goToPrev() {
    setMonth((m) => {
      if (m === 0) { setYear((y) => y - 1); return 11; }
      return m - 1;
    });
  }

  function goToNext() {
    setMonth((m) => {
      if (m === 11) { setYear((y) => y + 1); return 0; }
      return m + 1;
    });
  }

  function goToToday() {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  }

  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  return { year, month, goToPrev, goToNext, goToToday, isCurrentMonth };
}
