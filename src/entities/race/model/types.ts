/**
 * Domain model for a race. The client only ever sees `NormalizedRace`;
 * the API layer maps loose external shapes onto this.
 */
export interface NormalizedRace {
  id: string;
  title: string;
  startDate: string | null;
  endDate: string | null;
  location: string | null;
  events: string[];
  thumbnail: string | null;
  officialUrl: string | null;
}

export const RACE_EVENTS = ['full', 'half', '10k', '5k'] as const;
export type RaceEvent = (typeof RACE_EVENTS)[number];

export const RACE_EVENT_LABEL: Record<RaceEvent, string> = {
  full: '풀',
  half: '하프',
  '10k': '10K',
  '5k': '5K',
};

export interface RaceQueryRange {
  from: string; // YYYY-MM-DD
  to: string;
}
