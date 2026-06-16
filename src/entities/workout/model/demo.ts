import type { Workout } from './types';

function isoDaysAgo(days: number, hour = 7): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

/** Plausible recent running history used when HealthKit isn't available. */
export const DEMO_WORKOUTS: Workout[] = [
  { id: 'w-1', date: isoDaysAgo(0), distanceKm: 5.2, durationSec: 1638, avgPaceSec: 315, calories: 372, avgHeartRate: 152 },
  { id: 'w-2', date: isoDaysAgo(2), distanceKm: 10.4, durationSec: 3328, avgPaceSec: 320, calories: 731, avgHeartRate: 158 },
  { id: 'w-3', date: isoDaysAgo(3), distanceKm: 3.1, durationSec: 1023, avgPaceSec: 330, calories: 221, avgHeartRate: 146 },
  { id: 'w-4', date: isoDaysAgo(5), distanceKm: 8.0, durationSec: 2640, avgPaceSec: 330, calories: 560, avgHeartRate: 155 },
  { id: 'w-5', date: isoDaysAgo(6), distanceKm: 5.0, durationSec: 1500, avgPaceSec: 300, calories: 358, avgHeartRate: 160 },
  { id: 'w-6', date: isoDaysAgo(9), distanceKm: 15.0, durationSec: 5100, avgPaceSec: 340, calories: 1050, avgHeartRate: 151 },
  { id: 'w-7', date: isoDaysAgo(12), distanceKm: 6.4, durationSec: 2112, avgPaceSec: 330, calories: 451, avgHeartRate: 149 },
  { id: 'w-8', date: isoDaysAgo(14), distanceKm: 21.1, durationSec: 7383, avgPaceSec: 350, calories: 1477, avgHeartRate: 156 },
];
