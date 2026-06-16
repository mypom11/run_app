/** A single running workout, normalized from HealthKit or demo data. */
export interface Workout {
  id: string;
  date: string; // ISO
  distanceKm: number;
  durationSec: number;
  avgPaceSec: number; // seconds per km
  calories?: number;
  avgHeartRate?: number;
}

/** Where the workout list came from. */
export type WorkoutSource = 'health' | 'demo';

export interface WorkoutSummary {
  runCount: number;
  totalDistanceKm: number;
  totalDurationSec: number;
  avgPaceSec: number;
}
