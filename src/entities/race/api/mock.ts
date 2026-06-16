import type { NormalizedRace } from '../model/types';

/** Offline seed data so the UI looks alive without a network round-trip. */
function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export const MOCK_RACES: NormalizedRace[] = [
  {
    id: 'seoul-marathon-2026',
    title: '서울 마라톤 2026',
    startDate: daysFromNow(12),
    endDate: daysFromNow(12),
    location: '서울 · 광화문 → 잠실',
    events: ['full', 'half', '10k'],
    thumbnail: 'https://picsum.photos/seed/runable-seoul/1200/900',
    officialUrl: null,
  },
  {
    id: 'hangang-night-5k',
    title: '한강 나이트런 5K',
    startDate: daysFromNow(26),
    endDate: daysFromNow(26),
    location: '서울 · 뚝섬한강공원',
    events: ['5k', '10k'],
    thumbnail: 'https://picsum.photos/seed/runable-hangang/1200/900',
    officialUrl: null,
  },
  {
    id: 'jeju-island-half',
    title: '제주 오션 하프',
    startDate: daysFromNow(40),
    endDate: daysFromNow(40),
    location: '제주 · 함덕해변',
    events: ['half', '10k', '5k'],
    thumbnail: 'https://picsum.photos/seed/runable-jeju/1200/900',
    officialUrl: null,
  },
  {
    id: 'busan-bridge-run',
    title: '부산 브릿지런',
    startDate: daysFromNow(54),
    endDate: daysFromNow(54),
    location: '부산 · 광안대교',
    events: ['full', 'half'],
    thumbnail: 'https://picsum.photos/seed/runable-busan/1200/900',
    officialUrl: null,
  },
  {
    id: 'chuncheon-lake-marathon',
    title: '춘천 호반 마라톤',
    startDate: daysFromNow(73),
    endDate: daysFromNow(73),
    location: '강원 · 의암호',
    events: ['full', '10k'],
    thumbnail: 'https://picsum.photos/seed/runable-chuncheon/1200/900',
    officialUrl: null,
  },
  {
    id: 'incheon-sky-10k',
    title: '인천 스카이 10K',
    startDate: daysFromNow(88),
    endDate: daysFromNow(88),
    location: '인천 · 송도센트럴파크',
    events: ['10k', '5k'],
    thumbnail: 'https://picsum.photos/seed/runable-incheon/1200/900',
    officialUrl: null,
  },
];
