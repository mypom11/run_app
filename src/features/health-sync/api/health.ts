import { Platform } from 'react-native';
import {
  isHealthDataAvailableAsync,
  queryWorkoutSamples,
  requestAuthorization,
  WorkoutActivityType,
} from '@kingstinct/react-native-healthkit';
import type { ObjectTypeIdentifier } from '@kingstinct/react-native-healthkit';

import type { Workout } from '@/entities/workout';

/**
 * Real Apple HealthKit access (iOS native builds only). The library's
 * functions no-op to empty/false when the native module is absent
 * (web, Expo Go, Android), so every call is additionally try/caught.
 */

const READ_TYPES: readonly ObjectTypeIdentifier[] = [
  'HKWorkoutTypeIdentifier',
  'HKQuantityTypeIdentifierDistanceWalkingRunning',
  'HKQuantityTypeIdentifierActiveEnergyBurned',
];

export async function isHealthAvailable(): Promise<boolean> {
  if (Platform.OS !== 'ios') return false;
  try {
    return await isHealthDataAvailableAsync();
  } catch {
    return false;
  }
}

export async function requestHealthAuth(): Promise<boolean> {
  try {
    return await requestAuthorization({ toRead: READ_TYPES });
  } catch {
    return false;
  }
}

/** HealthKit distance comes in meters by default; normalize to km. */
function toKm(unit: string, quantity: number): number {
  if (unit === 'km') return quantity;
  if (unit === 'mi') return quantity * 1.60934;
  return quantity / 1000; // meters
}

function toSeconds(unit: string, quantity: number): number {
  if (unit === 'min') return quantity * 60;
  if (unit === 'h' || unit === 'hr') return quantity * 3600;
  return quantity; // seconds
}

export async function fetchRunningWorkouts(limit = 20): Promise<Workout[]> {
  try {
    const proxies = await queryWorkoutSamples({
      limit,
      ascending: false,
      filter: { workoutActivityType: WorkoutActivityType.running },
    });
    return proxies
      .map((proxy): Workout | null => {
        const w = proxy.toJSON();
        const distanceKm = w.totalDistance
          ? toKm(w.totalDistance.unit, w.totalDistance.quantity)
          : 0;
        const durationSec = w.duration
          ? toSeconds(w.duration.unit, w.duration.quantity)
          : (new Date(w.endDate).getTime() - new Date(w.startDate).getTime()) / 1000;
        if (distanceKm <= 0 || durationSec <= 0) return null;
        return {
          id: w.uuid,
          date: new Date(w.startDate).toISOString(),
          distanceKm,
          durationSec,
          avgPaceSec: durationSec / distanceKm,
          calories: w.totalEnergyBurned?.quantity,
        };
      })
      .filter((w): w is Workout => w !== null);
  } catch {
    return [];
  }
}
