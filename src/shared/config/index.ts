import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

/** Runable.me public API (called directly from the app — no BFF in RN). */
export const RUNABLE_API_BASE = 'https://runable.me/next-api/index/v1';
export const RUNABLE_STORAGE_BASE = 'https://storage.runable.me';

type IconName = ComponentProps<typeof Ionicons>['name'];

/** Bottom tab navigation — mirrors the web NAV_ITEMS. */
export const TAB_ITEMS: {
  name: string;
  label: string;
  icon: IconName;
  iconActive: IconName;
}[] = [
  { name: 'index', label: '홈', icon: 'home-outline', iconActive: 'home' },
  { name: 'race', label: '대회', icon: 'calendar-outline', iconActive: 'calendar' },
  { name: 'magazine', label: '매거진', icon: 'book-outline', iconActive: 'book' },
  { name: 'runtrip', label: '런트립', icon: 'airplane-outline', iconActive: 'airplane' },
  { name: 'pace', label: '페이스', icon: 'stopwatch-outline', iconActive: 'stopwatch' },
];
