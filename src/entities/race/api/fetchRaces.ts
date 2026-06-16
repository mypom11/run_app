import { RUNABLE_API_BASE } from '@/shared/config';
import type { NormalizedRace, RaceEvent, RaceQueryRange } from '../model/types';
import { MOCK_RACES } from './mock';

interface RawRace {
  id?: string | number;
  compId?: string | number;
  uuid?: string;
  title?: string;
  name?: string;
  compName?: string;
  startDate?: string;
  startDateTime?: string;
  endDate?: string;
  endDateTime?: string;
  location?: string;
  region?: string;
  address?: string;
  thumbnail?: string;
  imageUrl?: string;
  posterUrl?: string;
  officialUrl?: string;
  homepage?: string;
  events?: unknown;
  eventNames?: unknown;
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
}

export interface RaceFilters extends RaceQueryRange {
  events?: RaceEvent[];
}

function pickStr(...vals: unknown[]): string | null {
  for (const v of vals) if (typeof v === 'string' && v.trim()) return v;
  return null;
}

function normalize(raw: RawRace, i: number): NormalizedRace {
  const events = Array.isArray(raw.events)
    ? (raw.events as unknown[]).filter((e): e is string => typeof e === 'string')
    : Array.isArray(raw.eventNames)
      ? (raw.eventNames as unknown[]).filter((e): e is string => typeof e === 'string')
      : [];
  const lat = raw.lat ?? raw.latitude;
  const lng = raw.lng ?? raw.longitude;
  return {
    id: String(raw.id ?? raw.compId ?? raw.uuid ?? `race-${i}`),
    title: pickStr(raw.title, raw.name, raw.compName) ?? '이름 없는 대회',
    startDate: pickStr(raw.startDate, raw.startDateTime),
    endDate: pickStr(raw.endDate, raw.endDateTime),
    location: pickStr(raw.location, raw.region, raw.address),
    events,
    thumbnail: pickStr(raw.thumbnail, raw.imageUrl, raw.posterUrl),
    officialUrl: pickStr(raw.officialUrl, raw.homepage),
    ...(typeof lat === 'number' && typeof lng === 'number' ? { lat, lng } : {}),
  };
}

/**
 * Fetches races from the runable.me public API, normalizing loose shapes.
 * Falls back to mock data on any failure so the UI never renders empty.
 */
export async function fetchRaces(filters: RaceFilters): Promise<NormalizedRace[]> {
  try {
    const url = new URL(`${RUNABLE_API_BASE}/comp/list`);
    url.searchParams.set('from', filters.from);
    url.searchParams.set('to', filters.to);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`fetchRaces failed: ${res.status}`);
    const json = (await res.json()) as { compList?: RawRace[] } | RawRace[];
    const list = Array.isArray(json) ? json : (json.compList ?? []);
    if (!list.length) return MOCK_RACES;
    return list.map(normalize);
  } catch {
    return MOCK_RACES;
  }
}
