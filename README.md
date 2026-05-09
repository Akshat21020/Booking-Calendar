# Booking Calendar Heatmap

The application visualizes hotel occupancy across a monthly calendar view and supports interactive date range selection with booking insights.

---

# Features

## Core Features

- Month-view calendar with fixed 6×7 layout
- Occupancy heatmap based on room utilization
- Previous / Next / Today navigation
- Drag-to-select date range
- Booking details panel for selected dates
- Cancelled bookings excluded from occupancy calculations

---

## Additional Features

### Booking Status Filter

Filter occupancy and booking results by booking status.

### Monthly Statistics

Displays:
- Average occupancy %
- Total bookings
- Peak occupancy day

---

# Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS / CSS Modules
- Native Date API

---

# Key Implementation Decisions

## Occupancy Logic

Bookings follow an inclusive-exclusive range convention:

- `checkIn` date is occupied
- `checkOut` date is free

Example:

```txt
checkIn: 2026-02-10
checkOut: 2026-02-13
```

Occupied nights:

```txt
Feb 10, 11, 12
```

Checkout day is intentionally excluded during occupancy calculations.

---

## Calendar Rendering

The calendar always renders:
- 6 rows
- 7 columns
- 42 total cells

Overflow days from adjacent months are included to maintain a consistent layout.

---

## Drag Selection

Date range selection is implemented using native mouse events:
- `onMouseDown`
- `onMouseEnter`
- `onMouseUp`

Backward drag selection is supported by normalizing date ranges before comparison.

---

## State Management

Only source-of-truth state is stored in React:
- current month
- booking data
- selected range

Derived data such as occupancy maps are computed using utility functions and memoization.

---

# Running the Project

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

## Build for production

```bash
npm run build
```
---

# Notes

The implementation prioritizes:
- correctness of date logic
- clean state management
- modular architecture
- explainability during code walkthroughs

AI tools were used during development for iteration and scaffolding, but the final implementation logic and architecture decisions were refined and validated manually.
