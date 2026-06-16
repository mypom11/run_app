import { summarize, withinDays, type Workout } from '@/entities/workout';

const DAY_MS = 86400000;
const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

function startOfDay(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export interface DayBucket {
  /** Midnight timestamp of the day. */
  ts: number;
  label: string;
  distanceKm: number;
  isToday: boolean;
}

/** Distance run on each of the last `days` days (oldest → newest). */
export function dailyDistance(workouts: Workout[], days = 7): DayBucket[] {
  const today = startOfDay(Date.now());
  const buckets: DayBucket[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const ts = today - i * DAY_MS;
    buckets.push({
      ts,
      label: WEEKDAY[new Date(ts).getDay()],
      distanceKm: 0,
      isToday: i === 0,
    });
  }
  for (const w of workouts) {
    const day = startOfDay(new Date(w.date).getTime());
    const bucket = buckets.find((b) => b.ts === day);
    if (bucket) bucket.distanceKm += w.distanceKm;
  }
  return buckets;
}

export interface PacePoint {
  paceSec: number;
  distanceKm: number;
  ts: number;
}

/** Most recent `count` runs as a chronological pace series (oldest → newest). */
export function recentPaces(workouts: Workout[], count = 8): PacePoint[] {
  return [...workouts]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-count)
    .map((w) => ({ paceSec: w.avgPaceSec, distanceKm: w.distanceKm, ts: new Date(w.date).getTime() }));
}

export interface ActivityStats {
  totalDistanceKm: number;
  totalRuns: number;
  totalCalories: number;
  avgHeartRate: number;
  bestPaceSec: number;
  longestRunKm: number;
  /** Distance delta vs the previous 7-day window. */
  weekDeltaKm: number;
  /** Consecutive days (ending today or yesterday) with at least one run. */
  streakDays: number;
}

/** Headline numbers across the full history + week-over-week comparison. */
export function activityStats(workouts: Workout[]): ActivityStats {
  const all = summarize(workouts);
  const thisWeek = summarize(withinDays(workouts, 7));
  const lastWeekWindow = workouts.filter((w) => {
    const age = Date.now() - new Date(w.date).getTime();
    return age >= 7 * DAY_MS && age < 14 * DAY_MS;
  });
  const lastWeek = summarize(lastWeekWindow);

  const withHr = workouts.filter((w) => w.avgHeartRate != null);
  const avgHeartRate = withHr.length
    ? Math.round(withHr.reduce((s, w) => s + (w.avgHeartRate ?? 0), 0) / withHr.length)
    : 0;

  return {
    totalDistanceKm: all.totalDistanceKm,
    totalRuns: all.runCount,
    totalCalories: workouts.reduce((s, w) => s + (w.calories ?? 0), 0),
    avgHeartRate,
    bestPaceSec: workouts.reduce((m, w) => (w.avgPaceSec > 0 && (m === 0 || w.avgPaceSec < m) ? w.avgPaceSec : m), 0),
    longestRunKm: workouts.reduce((m, w) => Math.max(m, w.distanceKm), 0),
    weekDeltaKm: thisWeek.totalDistanceKm - lastWeek.totalDistanceKm,
    streakDays: currentStreak(workouts),
  };
}

function currentStreak(workouts: Workout[]): number {
  const days = new Set(workouts.map((w) => startOfDay(new Date(w.date).getTime())));
  const today = startOfDay(Date.now());
  // Allow the streak to "count" from today or yesterday so a rest-day-so-far
  // today doesn't reset a live streak.
  let cursor = days.has(today) ? today : today - DAY_MS;
  if (!days.has(cursor)) return 0;
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor -= DAY_MS;
  }
  return streak;
}
