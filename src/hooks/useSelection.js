import { useState, useCallback } from "react";
import { startOfDay } from "../utils/dateUtils";

export function useSelection() {
 
  const [anchor,       setAnchor]       = useState(null);
  const [hoverDate,    setHoverDate]    = useState(null);
  const [isSelecting,  setIsSelecting]  = useState(false);

  const [start, end] = deriveRange(anchor, hoverDate);

  const handleMouseDown = useCallback((date) => {
    const d = startOfDay(date);
    setAnchor(d);
    setHoverDate(d);
    setIsSelecting(true);
  }, []);

  const handleMouseEnter = useCallback((date) => {
    if (!isSelecting) return;
    setHoverDate(startOfDay(date));
  }, [isSelecting]);

  const handleMouseUp = useCallback((date) => {
    setHoverDate(startOfDay(date));
    setIsSelecting(false);
  }, []);

  const clearSelection = useCallback(() => {
    setAnchor(null);
    setHoverDate(null);
    setIsSelecting(false);
  }, []);

  return {
    selectionStart:  start,
    selectionEnd:    end,
    isSelecting,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    clearSelection,
  };
}

function deriveRange(anchor, hoverDate) {
  if (!anchor || !hoverDate) return [null, null];
  if (anchor <= hoverDate) return [anchor, hoverDate];
  return [hoverDate, anchor];
}
