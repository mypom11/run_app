import { RACE_EVENTS, type NormalizedRace, type RaceEvent } from '@/entities/race';

export const REGIONS = [
  { value: '', label: '전체' },
  { value: '서울', label: '서울' },
  { value: '경기', label: '경기' },
  { value: '인천', label: '인천' },
  { value: '부산', label: '부산' },
  { value: '제주', label: '제주' },
  { value: '강원', label: '강원' },
] as const;

export interface RaceFilterState {
  keyword: string;
  region: string;
  events: RaceEvent[];
}

export const EMPTY_FILTERS: RaceFilterState = { keyword: '', region: '', events: [] };

/** Maps a race's loose event labels onto the canonical RaceEvent keys. */
function raceEventKeys(race: NormalizedRace): Set<string> {
  const keys = new Set<string>();
  for (const raw of race.events) {
    const v = raw.toLowerCase();
    if (v.includes('full') || raw.includes('풀')) keys.add('full');
    else if (v.includes('half') || raw.includes('하프')) keys.add('half');
    else if (v.includes('10')) keys.add('10k');
    else if (v.includes('5')) keys.add('5k');
    else if (RACE_EVENTS.includes(v as RaceEvent)) keys.add(v);
  }
  return keys;
}

/** Client-side filtering — keyword (title/location), region, event chips. */
export function filterRaces(races: NormalizedRace[], f: RaceFilterState): NormalizedRace[] {
  const kw = f.keyword.trim().toLowerCase();
  return races.filter((race) => {
    if (kw) {
      const hay = `${race.title} ${race.location ?? ''}`.toLowerCase();
      if (!hay.includes(kw)) return false;
    }
    if (f.region && !(race.location ?? '').includes(f.region)) return false;
    if (f.events.length) {
      const keys = raceEventKeys(race);
      if (!f.events.some((e) => keys.has(e))) return false;
    }
    return true;
  });
}
