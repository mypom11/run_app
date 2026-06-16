import type { Workout, WorkoutSummary } from './types';

/** Workouts within the last `days` days (default 7). */
export function withinDays(workouts: Workout[], days = 7): Workout[] {
  const cutoff = Date.now() - days * 86400000;
  return workouts.filter((w) => new Date(w.date).getTime() >= cutoff);
}

/** Aggregate distance/duration and a distance-weighted average pace. */
export function summarize(workouts: Workout[]): WorkoutSummary {
  const totalDistanceKm = workouts.reduce((s, w) => s + w.distanceKm, 0);
  const totalDurationSec = workouts.reduce((s, w) => s + w.durationSec, 0);
  return {
    runCount: workouts.length,
    totalDistanceKm,
    totalDurationSec,
    avgPaceSec: totalDistanceKm > 0 ? totalDurationSec / totalDistanceKm : 0,
  };
}
