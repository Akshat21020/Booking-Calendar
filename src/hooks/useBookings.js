import { useState, useEffect } from "react";

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    let cancelled = false; 

    async function fetchBookings() {
      try {
        const res = await fetch("/bookings.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch bookings`);
        const data = await res.json();
        if (!cancelled) setBookings(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBookings();
    return () => { cancelled = true; };
  }, []);

  return { bookings, loading, error };
}
