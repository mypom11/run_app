import { useCallback, useEffect, useState } from 'react';

import { DEMO_WORKOUTS, type Workout, type WorkoutSource } from '@/entities/workout';
import { fetchRunningWorkouts, isHealthAvailable, requestHealthAuth } from '../api/health';

interface HealthWorkoutsState {
  workouts: Workout[];
  source: WorkoutSource;
  /** Whether HealthKit is available on this platform/build. */
  available: boolean;
  loading: boolean;
  /** Re-request authorization and refetch (wired to the connect button). */
  connect: () => Promise<void>;
}

async function loadFromHealth(): Promise<{ workouts: Workout[]; source: WorkoutSource; available: boolean }> {
  const available = await isHealthAvailable();
  if (available && (await requestHealthAuth())) {
    const runs = await fetchRunningWorkouts(30);
    if (runs.length) return { workouts: runs, source: 'health', available };
  }
  return { workouts: DEMO_WORKOUTS, source: 'demo', available };
}

/**
 * Resolves the user's running history: real HealthKit data on an iOS
 * native build, demo data everywhere else (web / Expo Go / Android).
 */
export function useHealthWorkouts(): HealthWorkoutsState {
  const [workouts, setWorkouts] = useState<Workout[]>(DEMO_WORKOUTS);
  const [source, setSource] = useState<WorkoutSource>('demo');
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadFromHealth().then((r) => {
      if (!active) return;
      setWorkouts(r.workouts);
      setSource(r.source);
      setAvailable(r.available);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const connect = useCallback(async () => {
    setLoading(true);
    const r = await loadFromHealth();
    setWorkouts(r.workouts);
    setSource(r.source);
    setAvailable(r.available);
    setLoading(false);
  }, []);

  return { workouts, source, available, loading, connect };
}
