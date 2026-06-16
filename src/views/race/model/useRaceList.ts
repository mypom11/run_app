import { useEffect, useState } from 'react';

import { fetchRaces, type NormalizedRace } from '@/entities/race';

function rangeNextMonths(months: number) {
  const now = new Date();
  const end = new Date(now);
  end.setMonth(end.getMonth() + months);
  return { from: now.toISOString().slice(0, 10), to: end.toISOString().slice(0, 10) };
}

/** Loads the full upcoming race list (mock fallback inside the API). */
export function useRaceList() {
  const [races, setRaces] = useState<NormalizedRace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchRaces(rangeNextMonths(12)).then((items) => {
      if (!active) return;
      setRaces(items);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return { races, loading };
}
