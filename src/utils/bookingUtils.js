import {
  parseDate,
  toDateString,
  addDays,
  startOfMonth,
  endOfMonth,
} from "./dateUtils";

export function buildOccupancyMap(
  bookings,
  statusFilter = "all"
) {
  const occupancyMap = new Map();

  for (const booking of bookings) {
    if (booking.status === "cancelled") continue;

    if (
      statusFilter !== "all" &&
      booking.status !== statusFilter
    ) {
      continue;
    }

    const checkIn = parseDate(booking.checkIn);
    const checkOut = parseDate(booking.checkOut);

    let currentDate = checkIn;

    while (currentDate < checkOut) {
      const key = toDateString(currentDate);

      occupancyMap.set(
        key,
        (occupancyMap.get(key) ?? 0) + (booking.rooms ?? 1)
      );

      currentDate = addDays(currentDate, 1);
    }
  }

  return occupancyMap;
}

export function getBookingsInRange(
  bookings,
  rangeStart,
  rangeEnd,
  statusFilter = "all"
) {
  return bookings.filter((booking) => {
    if (
      statusFilter !== "all" &&
      booking.status !== statusFilter
    ) {
      return false;
    }

    const checkIn = parseDate(booking.checkIn);
    const checkOut = parseDate(booking.checkOut);

    return checkIn < rangeEnd && checkOut > rangeStart;
  });
}

export function computeMonthStats(
  year,
  month,
  occupancyMap,
  bookings,
  statusFilter,
  maxRooms
) {
  const firstDay = startOfMonth(new Date(year, month));
  const lastDay = endOfMonth(new Date(year, month));

  let totalOccupancy = 0;
  let peakOccupancy = 0;
  let peakDay = null;

  const daysInMonth = lastDay.getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = toDateString(
      new Date(year, month, day)
    );

    const occupancy = occupancyMap.get(dateKey) ?? 0;

    totalOccupancy += occupancy;

    if (occupancy > peakOccupancy) {
      peakOccupancy = occupancy;
      peakDay = dateKey;
    }
  }

  const avgOccupancy =
    maxRooms > 0
      ? Math.round(
          (totalOccupancy / (daysInMonth * maxRooms)) * 100
        )
      : 0;

  const totalBookings = bookings.filter((booking) => {
    if (
      statusFilter !== "all" &&
      booking.status !== statusFilter
    ) {
      return false;
    }

    const checkIn = parseDate(booking.checkIn);
    const checkOut = parseDate(booking.checkOut);

    return checkIn <= lastDay && checkOut > firstDay;
  }).length;

  return {
    avgOccupancy,
    totalBookings,
    peakDay,
    peakCount: peakOccupancy,
  };
}