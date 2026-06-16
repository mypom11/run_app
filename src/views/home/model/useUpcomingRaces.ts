import { useCallback, useEffect, useState } from 'react';

import { fetchRaces, type NormalizedRace } from '@/entities/race';

function rangeNextMonths(months: number) {
  const now = new Date();
  const end = new Date(now);
  end.setMonth(end.getMonth() + months);
  return { from: now.toISOString().slice(0, 10), to: end.toISOString().slice(0, 10) };
}

/** Loads upcoming races for the home carousel (with mock fallback in the API). */
export function useUpcomingRaces(limit = 6) {
  const [races, setRaces] = useState<NormalizedRace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchRaces(rangeNextMonths(4)).then((items) => {
      if (!active) return;
      setRaces(items.slice(0, limit));
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [limit]);

  const reload = useCallback(async () => {
    setLoading(true);
    const items = await fetchRaces(rangeNextMonths(4));
    setRaces(items.slice(0, limit));
    setLoading(false);
  }, [limit]);

  return { races, loading, reload };
}
