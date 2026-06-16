import type { Workout } from '@/entities/workout';

/**
 * Web stub — HealthKit is iOS-only, so we never import the native library
 * here (keeps web bundling clean). Callers fall back to demo data.
 */

export async function isHealthAvailable(): Promise<boolean> {
  return false;
}

export async function requestHealthAuth(): Promise<boolean> {
  return false;
}

export async function fetchRunningWorkouts(_limit = 20): Promise<Workout[]> {
  return [];
}
